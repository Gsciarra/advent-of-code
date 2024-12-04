import { Direction, ParsedInput, Position } from "./types";

const directions: Direction[] = ["N", "S", "E", "W", "NE", "NW", "SE", "SW"];

export const modificatorsBasedOnDirection = {
  N: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
  NE: { x: 1, y: -1 },
  NW: { x: -1, y: -1 },
  SE: { x: 1, y: 1 },
  SW: { x: -1, y: 1 },
};

export function parser(input: string): ParsedInput {
  const rawGrid = input
    .split("\n")
    .map((line) => line.split(""))
    .filter((line) => line.length > 0);

  return rawGrid;
}

export function getXPositions(input: ParsedInput): Position[] {
  const xPositions: Position[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "X") {
        xPositions.push({ x, y });
      }
    }
  }
  return xPositions;
}

export function getWordsFromPosition(
  input: ParsedInput,
  x: number,
  y: number,
): string[] {
  const words = [];
  for (const direction of directions) {
    const word = getWordFromPosition(input, x, y, direction);
    word && words.push(word);
  }
  return words;
}

export function getWordFromPosition(
  input: ParsedInput,
  x: number,
  y: number,
  direction: Direction,
): string | undefined {
  let word = "";
  let currentPosition = { x, y };
  for (let i = 0; i < 4; i++) {
    if (isInsideGrid(currentPosition, input)) {
      word += input[currentPosition.y][currentPosition.x];
      currentPosition = {
        x: currentPosition.x + modificatorsBasedOnDirection[direction].x,
        y: currentPosition.y + modificatorsBasedOnDirection[direction].y,
      };
    } else {
      return;
    }
  }
  if (word.length === 4) {
    return word;
  }
  return;
}

function isInsideGrid(position: Position, input: ParsedInput): boolean {
  return (
    position.x >= 0 &&
    position.x < input[0].length &&
    position.y >= 0 &&
    position.y < input.length
  );
}

export function getAPositions(input: ParsedInput): Position[] {
  const aPositions: Position[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "A") {
        aPositions.push({ x, y });
      }
    }
  }
  return aPositions;
}

export function checkIfItsAMASCross(
  input: ParsedInput,
  position: Position,
): boolean {
  const topLeft = { x: position.x - 1, y: position.y - 1 };
  const topRight = { x: position.x + 1, y: position.y - 1 };
  const bottomLeft = { x: position.x - 1, y: position.y + 1 };
  const bottomRight = { x: position.x + 1, y: position.y + 1 };

  let charTopLeft = isInsideGrid(topLeft, input)
    ? input[topLeft.y][topLeft.x]
    : null;
  let charTopRight = isInsideGrid(topRight, input)
    ? input[topRight.y][topRight.x]
    : null;
  let charBottomLeft = isInsideGrid(bottomLeft, input)
    ? input[bottomLeft.y][bottomLeft.x]
    : null;
  let charBottomRight = isInsideGrid(bottomRight, input)
    ? input[bottomRight.y][bottomRight.x]
    : null;

  let isInDiagonal1 = false;
  let isInDiagonal2 = false;

  if (charTopLeft && charBottomRight) {
    const word1 = charTopLeft + input[position.y][position.x] + charBottomRight;
    const word2 = charBottomRight + input[position.y][position.x] + charTopLeft;
    isInDiagonal1 = word1 === "MAS" || word2 === "MAS";
  }

  if (charTopRight && charBottomLeft) {
    const word1 = charTopRight + input[position.y][position.x] + charBottomLeft;
    const word2 = charBottomLeft + input[position.y][position.x] + charTopRight;
    isInDiagonal2 = word1 === "MAS" || word2 === "MAS";
  }

  return isInDiagonal1 && isInDiagonal2;
}
