import { getParsedInput } from "@repo/utils/src";
import { ParsedInput } from "./types";
import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";
import { parser } from "./utils";

function part2(input: ParsedInput): number {
  const { leftList, rightList } = input;
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
  return similarityScore;
}

export async function solvePart2() {
  const input = await getParsedInput<ParsedInput>(1, DAY, YEAR, parser);
  if (!input.ok) {
    console.error(input.error);
    return;
  }
  part2(input.data);
}

export async function test() {
  const input = parser(EXAMPLE_INPUT);
  const result = part2(input);
  const expected = 31;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 2 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 2 failed: expected ${expected} but got ${result}`,
    );
  }
}
