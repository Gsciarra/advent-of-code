import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";
import { getParsedInput } from "@repo/utils/src";
import { checkIncreaseDecrease, checkSafety, parser } from "./utils";
import { ParsedInput } from "./types";

function part1(input: ParsedInput): number {
  let totalValid = 0;

  for (let report of input) {
    const status = checkIncreaseDecrease(report);

    if (status === "Invalid") {
      continue;
    }
    const safety = checkSafety(report);

    if (safety === "Unsafe") {
      continue;
    }

    totalValid++;
  }
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
  const expected = 2;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 1 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 1 failed: expected ${expected} but got ${result}`,
    );
  }
}
