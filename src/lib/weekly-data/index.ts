import {GraphQLClient, gql} from 'graphql-request';
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

export const getList = async () => await client.request<{
  repository: {
    issues: {
      edges: {
        node: {
          title: string;
          updatedAt: string;
          number: number;
        }
      }[];
    }
  }
}>(gql`
query {
  repository(owner: "LaughingJacky", name: "weekly") {
    issues(states: OPEN, filterBy: {labels: "weekly"}, last: 10) {
      edges {
        node {
          title
          updatedAt
          number
        }
      }
    }
  }
}
`);

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
