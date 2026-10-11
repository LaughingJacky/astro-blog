import {GraphQLClient, gql} from 'graphql-request';
import DOMPurify from 'isomorphic-dompurify';
import marked from '../marked';
// import type { MdastRoot } from 'remark-rehype/lib'
// import { EXIT, visit } from 'unist-util-visit';

// import { markdownRenderer } from './parser';

// interface BodyParseResult {
//   slug: string;
//   body: string;
//   serializedHeadings: string;
//   summary?: string;
//   summaryText?: string;
//   image?: string;
//   imageAlt?: string | null;
//   createdAt?: Date;
// }

const endpoint = 'https://api.github.com/graphql';
const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`
  }
});

export interface WeeklyNode {
  title: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  bodyHTML: string;
}

export interface WeeklyListResult {
  repository: {
    issues: {
      edges: { node: WeeklyNode }[];
    };
  };
}

interface RestIssue {
  number: number;
  title: string;
  body: string | null;
  created_at: string;
  updated_at: string;
  pull_request?: unknown;
}

const OWNER = 'LaughingJacky';
const REPO = 'weekly';
const EMPTY_RESULT: WeeklyListResult = { repository: { issues: { edges: [] } } };

// 有 GITHUB_TOKEN 时走 GraphQL（直接用 GitHub 渲染好的 bodyHTML）
const fetchByGraphQL = async (): Promise<WeeklyListResult> => await client.request<WeeklyListResult>(gql`
query {
  repository(owner: "LaughingJacky", name: "weekly") {
    issues(states: OPEN, filterBy: {labels: "weekly"}, orderBy: {field: CREATED_AT, direction: DESC}, last: 10) {
      edges {
        node {
          title
          createdAt
          updatedAt
          number
          body
          bodyHTML
          author {
            login
          }
        }
      }
    }
  }
}
`);

// 没有 token 时走 REST：公开仓库可匿名读取，body 是 markdown，需要自己渲染成 HTML
const fetchByRest = async (): Promise<WeeklyListResult> => {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/issues?labels=weekly&state=open&sort=created&direction=desc&per_page=10`,
    { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'astro-blog' } }
  );
  if (!res.ok) throw new Error(`GitHub REST ${res.status} ${res.statusText}`);

  const issues: RestIssue[] = await res.json();
  const edges: { node: WeeklyNode }[] = [];
  for (const issue of issues) {
    if (issue.pull_request) continue; // 排除 PR，只保留 issue
    edges.push({
      node: {
        title: issue.title,
        createdAt: issue.created_at,
        updatedAt: issue.updated_at,
        number: issue.number,
        bodyHTML: DOMPurify.sanitize(await marked.parse(String(issue.body ?? ''))),
      }
    });
  }
  return { repository: { issues: { edges } } };
};

let listPromise: Promise<WeeklyListResult> | null = null;

export const getList = async (): Promise<WeeklyListResult> => {
  // 一次构建里列表页和详情页都会调用，缓存住结果，避免重复请求（匿名请求配额很低）
  if (!listPromise) {
    listPromise = (async () => {
      try {
        return import.meta.env.GITHUB_TOKEN ? await fetchByGraphQL() : await fetchByRest();
      } catch (error) {
        // 该栏目拉取失败不应导致整站构建失败，降级为空列表
        console.warn(`[weekly] 拉取 GitHub issues 失败，本次构建跳过该栏目：${(error as Error).message}`);
        return EMPTY_RESULT;
      }
    })();
  }
  return listPromise;
};

export const getWeeklyItem = async (number: number) => await client.request<{
  repository: {
    issue: {
      title: string;
      updatedAt: string;
      body: string;
      bodyHTML: string;
      author: {
        login: string;
      }
    }
  }
}>(gql`
query {
  repository(owner: "LaughingJacky", name: "weekly") {
    issue(number: ${number}) {
      title
      updatedAt
      body
      bodyHTML
      author {
        login
      }
    }
  }
}
`);

// const bodyCont = (res as any).repository.issues.edges[0].node.body;
// const nodes = markdownRenderer.parse(bodyCont);
// const hrIndex = nodes.children.findIndex((node) => node.type === 'thematicBreak')

// const frontNodes: MdastRoot = {
//   type: 'root',
//   children: nodes.children.slice(0, hrIndex),
// }

// const result: Partial<BodyParseResult> = {};

// visit(frontNodes, 'image', (node) => {
//   result.image = node.url
//   result.imageAlt = node.alt
//   return EXIT
// })

// result.body = (res as any).repository.issues.edges[0].node.bodyHTML;

// console.log(
//  result
// );
