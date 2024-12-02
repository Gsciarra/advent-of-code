import { IncreaseDecrease, ParsedInput, Reports, SafeUnsafe } from "./types";

export function checkValidity(report: Reports): boolean {
  const status = checkIncreaseDecrease(report);
  if (status === "Invalid") {
    return false;
  }

  const safety = checkSafety(report);
  return safety !== "Unsafe";
}

export function parser(input: string): ParsedInput {
  return input
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.split(" ").map((n) => parseInt(n, 10)));
}

export function checkIncreaseDecrease(report: Reports): IncreaseDecrease {
  let status: IncreaseDecrease =
    report[0] < report[1] ? "Increasing" : "Decreasing";

  for (let i = 1; i < report.length; i++) {
    let currentStatus: IncreaseDecrease =
      report[i - 1] < report[i] ? "Increasing" : "Decreasing";

    if (currentStatus !== status) {
      return "Invalid";
    }
  }

  return status;
}

export function checkSafety(report: Reports): SafeUnsafe {
  let status: SafeUnsafe = "Safe";

  for (let i = 1; i < report.length; i++) {
    const diff = Math.abs(report[i - 1] - report[i]);
    if (diff < 1 || diff > 3) {
      return "Unsafe";
    }
  }

  return status;
}
