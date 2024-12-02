import { getParsedInput } from "@repo/utils/src";
import { ParsedInput } from "./types";
import { checkValidity, parser } from "./utils";
import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";

export function part2(input: ParsedInput): number {
  let totalValid = 0;

  for (let report of input) {
    for (let skippedIndex = 0; skippedIndex < report.length; skippedIndex++) {
      const copy = [...report];
      copy.splice(skippedIndex, 1);

      if (checkValidity(copy)) {
        totalValid++;
        break;
      }
    }
  }
  console.log("Day 2 - Part 2:", totalValid);
  return totalValid;
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
  const expected = 4;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 2 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 2 failed: expected ${expected} but got ${result}`,
    );
  }
}
