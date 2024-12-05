export type ParsedInput = { rules: Rule[]; pagesList: Pages[] };

export type Rule = { before: number; after: number };
export type Pages = number[];
