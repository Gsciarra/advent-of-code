import { Pages, ParsedInput, Rule } from "./types";

export function parser(input: string): ParsedInput {
  const parsedInput: ParsedInput = { rules: [], pagesList: [] };
  let isRulesCompleted = false;

  const lines = input.split("\n");

  for (const line of lines) {
    if (!line) {
      isRulesCompleted = true;
      continue;
    }

    if (!isRulesCompleted) {
      const [before, after] = line.split("|").map(Number);
      parsedInput.rules.push({ before, after });
    } else {
      const pages = line.split(",").map(Number);
      parsedInput.pagesList.push(pages);
    }
  }

  return parsedInput;
}

export function isFollowingTheRules(
  pages: number[],
  rules: { before: number; after: number }[],
): boolean {
  for (const rule of rules) {
    const beforeIndex = pages.indexOf(rule.before);
    const afterIndex = pages.indexOf(rule.after);

    if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex > afterIndex) {
      return false;
    }
  }

  return true;
}

function movePageNumberFromIndexToIndex(
  pages: Pages,
  fromIndex: number,
  toIndex: number,
) {
  const removeNToMove = pages.splice(fromIndex, 1);
  pages.splice(toIndex, 0, removeNToMove[0]);
}

export function fixPageToFollowTheRules(pages: Pages, rules: Rule[]): Pages {
  const pagesCopy = [...pages];
  for (const rule of rules) {
    const beforeIndex = pagesCopy.indexOf(rule.before);
    const afterIndex = pagesCopy.indexOf(rule.after);

    if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex > afterIndex) {
      movePageNumberFromIndexToIndex(pagesCopy, afterIndex, beforeIndex);
    }
  }

  return pagesCopy;
}
