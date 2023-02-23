/*
 * @Author: shawbowang
 * @Date: 2023-02-23 21:35:24
 * @LastEditTime: 2023-02-23 21:46:45
 * @LastEditors: shawbowang
 * @Description: 
 * @FilePath: /blog/src/lib/draft.ts
 */
import { useState } from "preact/hooks";

import { COLS, ROWS } from "../components/Minesweep";

export function generateMap(seedBombs: string[]) {
  let map = new Map();

  function incrementDanger(neighborKey: string) {
    if (!map.has(neighborKey)) {
      map.set(neighborKey, 1);
    } else {
      let oldVal = map.get(neighborKey);
      if (oldVal !== 'bomb') {
        map.set(neighborKey, oldVal + 1);
      }
    }
  }

  for (let key of seedBombs) {
    map.set(key, 'bomb');
    for (let neighborKey of getNeighbors(key)) {
      incrementDanger(neighborKey);
    }
  }

  return map;
}


export function getNeighbors(key: string) {
  let [row, col] = fromKey(key);
  let neighborRowCols: [number, number][] = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1]
  ];

  return neighborRowCols.filter(isInBounds).map(([r, c]) => toKey(r, c));
}

export function fromKey(key: string) {
  return key.split('-').map(Number);
}

export function toKey(row: number, col: number) {
  return `${row}-${col}`;
}


function isInBounds([row, col]: number[]) {
  if (row < 0 || col < 0) {
    return false;
  }
  if (row >= ROWS || col >= COLS) {
    return false;
  }
  return true;
}

export function generateBombs(r: number, c: number) {
  let count = Math.round(Math.sqrt(r * c));

  let allKeys = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      allKeys.push(toKey(i, j));
    }
  }
  
  allKeys.sort(() => {
    let coinFlip = Math.random() > 0.5;
    return coinFlip ? 1 : -1;
  });

  return allKeys.slice(0, count);
}

//create your forceUpdate hook
export function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}
