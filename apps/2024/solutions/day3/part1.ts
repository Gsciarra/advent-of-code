import { DAY, EXAMPLE_INPUT1, YEAR } from "./consts";
import { getParsedInput } from "@repo/utils/src";
import { parser } from "./utils";
import { ParsedInput } from "./types";

function part1(input: ParsedInput): number {
  let total = 0;
  for (const { operation, values } of input) {
    if (operation === "mul") {
      total += values.reduce((acc, val) => acc * val, 1);
    }
  }
  console.log(`Day ${DAY} - Part 1:`, total);
  return total;
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
  const input = parser(EXAMPLE_INPUT1);
  const result = part1(input);
  const expected = 161;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 1 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 1 failed: expected ${expected} but got ${result}`,
    );
  }
}
