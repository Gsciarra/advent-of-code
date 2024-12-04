import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";
import { getParsedInput } from "@repo/utils/src";
import { getWordsFromPosition, getXPositions, parser } from "./utils";
import { ParsedInput } from "./types";

function part1(parsedInput: ParsedInput): number {
  let result = 0;

  const xPositions = getXPositions(parsedInput);

  const words = [];
  for (const { x, y } of xPositions) {
    const wordsFromCurrentPosition = getWordsFromPosition(parsedInput, x, y);
    words.push(...wordsFromCurrentPosition);
  }

  for (const word of words) {
    if (word === "XMAS") {
      result++;
    }
  }

  console.log(`Day ${DAY} - Part 1:`, result);
  return result;
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
  const expected = 18;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 1 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 1 failed: expected ${expected} but got ${result}`,
    );
  }
}