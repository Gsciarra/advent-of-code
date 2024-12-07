import { getParsedInput } from "@repo/utils";
import { Pages, ParsedInput } from "./types";
import { fixPageToFollowTheRules, isFollowingTheRules, parser } from "./utils";
import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";

export function part2(input: ParsedInput): number {
  let midPagesSum = 0;

  const invalidPagesList = input.pagesList.filter(
    (pages) => !isFollowingTheRules(pages, input.rules),
  );

  let fixedPagesList: Pages[] = invalidPagesList.map((pages) =>
    fixPageToFollowTheRules(pages, input.rules),
  );

  let actualValid: number = fixedPagesList.filter((pages) =>
    isFollowingTheRules(pages, input.rules),
  ).length;

  while (actualValid !== fixedPagesList.length) {
    fixedPagesList = fixedPagesList.map((pages) =>
      fixPageToFollowTheRules(pages, input.rules),
    );

    actualValid = fixedPagesList.filter((pages) =>
      isFollowingTheRules(pages, input.rules),
    ).length;
  }

  for (const pages of fixedPagesList) {
    const midIndex = Math.floor(pages.length / 2);
    midPagesSum += pages[midIndex];
  }

  console.log("Day 2 - Part 2:", midPagesSum);
  return midPagesSum;
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
  const expected = 123;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 2 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 2 failed: expected ${expected} but got ${result}`,
    );
  }
}
