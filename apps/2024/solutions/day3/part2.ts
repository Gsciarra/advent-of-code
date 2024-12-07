import { getParsedInput } from "@repo/utils";
import { ParsedInput } from "./types";
import { parser2 } from "./utils";
import { DAY, EXAMPLE_INPUT2, YEAR } from "./consts";

export function part2(input: ParsedInput): number {
  let total = 0;
  for (const { operation, values } of input) {
    if (operation === "mul") {
      total += values.reduce((acc, val) => acc * val, 1);
    }
  }
  console.log("Day 2 - Part 2:", total);
  return total;
}

export default async function solvePart2() {
  const input = await getParsedInput<ParsedInput>(2, DAY, YEAR, parser2);
  if (!input.ok) {
    console.error(input.error);
    return;
  }
  part2(input.data);
}

export async function test() {
  const input = parser2(EXAMPLE_INPUT2);
  const result = part2(input);
  const expected = 48;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 2 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 2 failed: expected ${expected} but got ${result}`,
    );
  }
}
