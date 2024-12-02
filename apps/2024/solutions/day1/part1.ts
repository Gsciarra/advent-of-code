import { getParsedInput } from "@repo/utils/src";
import { ParsedInput } from "./types";
import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";
import { parser } from "./utils";

function part1(input: ParsedInput): number {
  const { leftList, rightList } = input;
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
  return totalDistance;
}

export default async function solvePart1() {
  const input = await getParsedInput<ParsedInput>(1, DAY, YEAR, parser);
  if (!input.ok) {
    console.error(input.error);
    return;
  }
  part1(input.data);
}

export async function test() {
  const input = parser(EXAMPLE_INPUT);
  const result = part1(input);
  const expected = 11;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 1 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 1 failed: expected ${expected} but got ${result}`,
    );
  }
}
