import { ParsedInput } from "./types";

export function parser(input: string): ParsedInput {
  const lines = input.split("\n");
  let parsedInput: [number, number][] = [];

  for (let line of lines) {
    if (line === "") continue;

    const [a, b] = line.split(/\s+/).map((num) => parseInt(num, 10));
    parsedInput.push([a, b]);
  }

  return {
    leftList: parsedInput.map(([a]) => a).sort((a, b) => a - b),
    rightList: parsedInput.map(([_, b]) => b).sort((a, b) => a - b),
  };
}
