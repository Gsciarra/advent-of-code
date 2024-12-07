export type ParsedInput = Equation[];

export type Equation = { result: number; values: number[] };
export type Operator = "+" | "*" | "||";
