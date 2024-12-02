import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";
import { getParsedInput } from "@repo/utils/src";
import {  parser } from "./utils";
import { ParsedInput } from "./types";

function part1(input: ParsedInput): number {

  console.log(`Day ${DAY} - Part 1:`, totalValid);
  return totalValid;
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
  const expected = ;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 1 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 1 failed: expected ${expected} but got ${result}`,
    );
  }
}
