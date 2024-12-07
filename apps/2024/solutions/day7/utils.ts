import { Equation, Operator, ParsedInput } from "./types";
import { getCombinationsGenerator } from "@repo/utils";

export function parser(input: string): ParsedInput {
  return input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      const [result, values] = line.split(": ");
      return {
        result: Number(result),
        values: values.split(" ").map((v) => Number(v)),
      };
    });
}

export function checkEquation(
  equation: Equation,
  possibleOperators: Operator[],
): boolean {
  const operators = getCombinationsGenerator(
    equation.values.length - 1,
    possibleOperators,
  );

  if (equation.values.length === 1) {
    return equation.values[0] === equation.result;
  }

  for (const operator of operators) {
    if (getResult(equation.values, operator) === equation.result) {
      return true;
    }
  }
  return false;
}

function getResult(values: number[], operators: Operator[]): number {
  let result = values[0];

  for (let i = 0; i < operators.length; i++) {
    switch (operators[i]) {
      case "+":
        result += values[i + 1];
        break;
      case "*":
        result *= values[i + 1];
        break;
      case "||":
        result = Number(`${result}${values[i + 1]}`);
        break;
    }
  }
  return result;
}
