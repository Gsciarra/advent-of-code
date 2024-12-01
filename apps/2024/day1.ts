import { config } from "dotenv";
import { resolve } from "path";
import { getParsedInput } from "@repo/utils/src";

config(); // Load .env file

const day = 1;
const year = 2024;

type ParsedInput = { leftList: number[]; rightList: number[] };

function parser(input: string): ParsedInput {
  const lines = input.split("\n");
  let parsedInput: [number, number][] = [];

  for (let line of lines) {
    if (line === "") continue;

    const [a, b] = line.split(/\s+/).map((num) => parseInt(num, 10));
    parsedInput.push([a, b]);
  }

  return {
    leftList: parsedInput.map(([a]) => a).sort((a, b) => a - b),
    rightList: parsedInput.map(([_, b]) => b).sort((a, b) => a - b),
  };
}

async function solveDay1part1() {
  const input = await getParsedInput<ParsedInput>(1, day, year, parser);
  if (!input.ok) {
    console.error(input.error);
    return;
  }
  const { leftList, rightList } = input.data;
  let totalDistance = 0;

  for (let index = 0; index < leftList.length; index++) {
    const left = leftList[index];
    const right = rightList[index];

    if (left === right) {
      continue;
    }

    totalDistance += Math.abs(right - left);
  }

  console.log("Day 1 - part 1:", totalDistance);
}

async function solveDay1part2() {
  const input = await getParsedInput<ParsedInput>(1, day, year, parser);
  if (!input.ok) {
    console.error(input.error);
    return;
  }
  const { leftList, rightList } = input.data;
  const repetitions: Map<number, number> = new Map();
  let similarityScore = 0;

  const getRepetitions = (n: number) => {
    if (repetitions.has(n)) {
      return repetitions.get(n) as number;
    }

    const repeated = rightList.reduce((acc, right) => {
      if (right === n) {
        acc++;
      }

      return acc;
    }, 0);
    repetitions.set(n, repeated);
    return repeated;
  };

  for (let index = 0; index < leftList.length; index++) {
    const left = leftList[index];
    const repeated = getRepetitions(left);
    similarityScore += repeated * left;
  }

  console.log("Day 1 - part 2:", similarityScore);
}

solveDay1part1();
solveDay1part2();
//
// const filePath = resolve(__dirname, "./input/day1.txt");
//
// const rawInput = readFileSync(filePath, "utf-8");
// const lines = rawInput.split("\n");
// let input = [];
//
// for (let line of lines) {
//   if (line === "") continue;
//
//   const [a, b] = line.split(/\s+/).map((num) => parseInt(num, 10));
//   input.push([a, b]);
// }
//
//
// const leftList = input.map(([a]) => a).sort(
//   (a, b) => a - b
// );
// const rightList = input.map(([_, b]) => b).sort(
//   (a, b) => a - b
// );
// Part 1 solution
// let totalDistance = 0;

// for (let index = 0; index < leftList.length; index++) {
//   const left = leftList[index];
//   const right = rightList[index];
//
//   if (left === right) {
//     continue;
//   }
//
//   totalDistance += Math.abs(right - left);
// }

// console.log("part1:",totalDistance);

// Part 2 solution
// const repetitions: Map<number, number> = new Map();
// let similarityScore = 0;
//
// const getRepetitions = (n: number) => {
//   if (repetitions.has(n)) {
//     return repetitions.get(n) as number;
//   }
//
//   const repeated = rightList.reduce((acc, right) => {
//     if (right === n) {
//       acc++;
//     }
//
//     return acc;
//   }, 0)
//   repetitions.set(n, repeated);
//   return repeated;
// }
//
// for (let index = 0; index < leftList.length; index++) {
//   const left = leftList[index];
//   const repeated = getRepetitions(left);
//   similarityScore += (repeated * left);
// }
//
// console.log("part2:", similarityScore);
