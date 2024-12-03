import { ParsedInput } from "./types";

export function parser(input: string): ParsedInput {
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches: ParsedInput = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    const values = [parseInt(match[1], 10), parseInt(match[2], 10)];
    matches.push({ operation: "mul", values });
  }

  return matches;
}

export function parser2(input: string): ParsedInput {
  const doDontSplitInput = input.split("do()").map((s) => s.split("don't()"));
  let inputFromDo = "";

  for (let i = 0; i < doDontSplitInput.length; i++) {
    inputFromDo += doDontSplitInput[i][0];
  }

  const regex = /mul\((\d+),(\d+)\)/g;
  const matches: ParsedInput = [];
  let match;

  while ((match = regex.exec(inputFromDo)) !== null) {
    const values = [parseInt(match[1], 10), parseInt(match[2], 10)];
    matches.push({ operation: "mul", values });
  }

  return matches;
}
