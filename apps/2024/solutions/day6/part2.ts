import { getParsedInput } from "@repo/utils";
import { ParsedInput } from "./types";
import {
  checkIfGuardGoesInALoop,
  getAllGuardVisitedPositions,
  getGuard,
  parser,
  placeObstacleInPosition,
} from "./utils";
import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";

export function part2(input: ParsedInput): number {
  let obstaclePositions = [];
  let guard = getGuard(input);
  const guardPositions = getAllGuardVisitedPositions(guard, input);

  for (let position of guardPositions) {
    const currentMap = placeObstacleInPosition(position, input);

    if (checkIfGuardGoesInALoop(currentMap)) {
      obstaclePositions.push(position);
    }
  }
  console.log("Day 2 - Part 2:", obstaclePositions.length);
  return obstaclePositions.length;
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
  const expected = 6;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 2 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 2 failed: expected ${expected} but got ${result}`,
    );
  }
}
