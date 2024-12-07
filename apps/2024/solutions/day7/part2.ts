import { getParsedInput } from "@repo/utils";
import { Operator, ParsedInput } from "./types";
import { checkEquation, parser } from "./utils";
import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";

const OPERATORS: Operator[] = ["+", "*", "||"];

export function part2(input: ParsedInput): number {
  let result = 0;

  for (const equation of input) {
    if (checkEquation(equation, OPERATORS)) {
      result += equation.result;
    }
  }

  console.log("Day 2 - Part 2:", result);
  return result;
}

export default async function solvePart2() {
  const input = await getParsedInput<ParsedInput>(2, DAY, YEAR, parser);
  if (!input.ok) {
    console.error(input.error);
    return;
  }
  part2(input.data);
}

export async function test() {
  const input = parser(EXAMPLE_INPUT);
  const result = part2(input);
  const expected = 11387;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 2 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 2 failed: expected ${expected} but got ${result}`,
    );
  }
}
