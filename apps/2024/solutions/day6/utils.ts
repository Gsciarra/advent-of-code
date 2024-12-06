import { Direction, Guard, ParsedInput, Position } from "./types";

export function parser(input: string): ParsedInput {
  return input.split("\n").map((line) => line.split(""));
}

export function getGuard(input: ParsedInput): Guard {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "^") {
        return { position: { x, y }, direction: "N" };
      }
      if (input[y][x] === "v") {
        return { position: { x, y }, direction: "S" };
      }
      if (input[y][x] === ">") {
        return { position: { x, y }, direction: "E" };
      }
      if (input[y][x] === "<") {
        return { position: { x, y }, direction: "W" };
      }
    }
  }

  throw new Error("Guard not found");
}

export function checkGuardNextPosition(
  guard: Guard,
  map: ParsedInput,
): "IN" | "OUT" | "OBSTACLE" {
  const nextPosition = getGuardNextPosition(guard);
  if (!checkIfPositionIsInMap(nextPosition, map)) {
    return "OUT";
  }

  return map[nextPosition.y][nextPosition.x] === "#" ? "OBSTACLE" : "IN";
}

export function getGuardNextPosition({ position, direction }: Guard): Position {
  switch (direction) {
    case "N":
      return { x: position.x, y: position.y - 1 };
    case "S":
      return { x: position.x, y: position.y + 1 };
    case "E":
      return { x: position.x + 1, y: position.y };
    case "W":
      return { x: position.x - 1, y: position.y };
  }
}

export function getGuardNextDirection(
  currentDirection: Direction,
  turn: "L" | "R",
): Direction {
  switch (currentDirection) {
    case "N":
      return turn === "L" ? "W" : "E";
    case "S":
      return turn === "L" ? "E" : "W";
    case "E":
      return turn === "L" ? "N" : "S";
    case "W":
      return turn === "L" ? "S" : "N";
  }
}

export function checkIfPositionIsInMap(
  { x, y }: Position,
  map: ParsedInput,
): boolean {
  return y >= 0 && y < map.length && x >= 0 && x < map[y].length;
}

export function getAllGuardVisitedPositions(
  guard: Guard,
  map: ParsedInput,
): Position[] {
  let startingPosition = `${guard.position.x},${guard.position.y}`;
  let visitedPositions = new Set<string>();

  loop: while (checkIfPositionIsInMap(guard.position, map)) {
    const nextPosition = checkGuardNextPosition(guard, map);
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

  visitedPositions.delete(startingPosition);

  return Array.from(visitedPositions).map((position) => {
    const [x, y] = position.split(",").map(Number);
    return { x, y };
  });
}

export function checkIfGuardGoesInALoop(map: ParsedInput): boolean {
  let visitedPositions = new Set<string>();
  const guard = getGuard(map);

  while (checkIfPositionIsInMap(guard.position, map)) {
    const position = `${guard.position.x},${guard.position.y},${guard.direction}`;
    if (visitedPositions.has(position)) {
      return true;
    } else {
      visitedPositions.add(position);
    }

    const nextPosition = checkGuardNextPosition(guard, map);
    switch (nextPosition) {
      case "IN": {
        guard.position = getGuardNextPosition(guard);
        break;
      }
      case "OUT": {
        return false;
      }
      case "OBSTACLE": {
        guard.direction = getGuardNextDirection(guard.direction, "R");
      }
    }
  }
  return false;
}

export function placeObstacleInPosition(
  position: Position,
  map: ParsedInput,
): ParsedInput {
  const newMap = map.map((row) => [...row]);
  newMap[position.y][position.x] = "#";
  return newMap;
}
