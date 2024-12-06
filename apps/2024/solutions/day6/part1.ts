import { DAY, EXAMPLE_INPUT, YEAR } from "./consts";
import { getParsedInput } from "@repo/utils/src";
import {
  checkGuardNextPosition,
  checkIfPositionIsInMap,
  getGuard,
  getGuardNextDirection,
  getGuardNextPosition,
  parser,
} from "./utils";
import { ParsedInput } from "./types";

function part1(input: ParsedInput): number {
  let visitedPositions = new Set<string>();
  const guard = getGuard(input);
  visitedPositions.add(`${guard.position.x},${guard.position.y}`);

  loop: while (checkIfPositionIsInMap(guard.position, input)) {
    const nextPosition = checkGuardNextPosition(guard, input);
    switch (nextPosition) {
      case "IN": {
        guard.position = getGuardNextPosition(guard);
        visitedPositions.add(`${guard.position.x},${guard.position.y}`);
        break;
      }
      case "OUT": {
        break loop;
      }
      case "OBSTACLE": {
        guard.direction = getGuardNextDirection(guard.direction, "R");
      }
    }
  }

  console.log(`Day ${DAY} - Part 1:`, visitedPositions.size);
  return visitedPositions.size;
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
  const expected = 41;
  if (result === expected) {
    console.log(`Test day ${DAY} - part 1 passed`);
  } else {
    console.error(
      `Test day ${DAY} - part 1 failed: expected ${expected} but got ${result}`,
    );
  }
}
