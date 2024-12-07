import { readFileSync, writeFileSync } from "fs";
import { HandledResult } from "./types";
import * as process from "node:process";
export * from "./types";
import { resolve } from "path";

async function downloadInputFile(day: number, year: number): Promise<void> {
  const link = `https://adventofcode.com/${year}/day/${day}/input`;
  const cookie = process.env.AOC_SESSION_COOKIE;

  if (!cookie) {
    console.error("Please provide your AOC_SESSION_COOKIE");
    return;
  }

  const headers = {
    cookie: `session=${cookie}`,
  };

  console.log("Downloading input file...");
  const response = await fetch(link, { headers });

  if (!response.ok) {
    console.error("Failed to download input file");
    return;
  }

  const input = await response.text();

  console.log("Writing input file...");
  writeFileSync(generateInputFilePath(day), input);
}

async function getInput(
  day: number,
  year: number,
): Promise<HandledResult<string>> {
  const filePath = generateInputFilePath(day);
  try {
    console.log("Reading input file...");
    const input = readFileSync(filePath, "utf-8");
    return { data: input, ok: true };
  } catch (error) {
    await downloadInputFile(day, year);
  }

  try {
    console.log("Reading input file...");
    const input = readFileSync(filePath, "utf-8");
    return { data: input, ok: true };
  } catch (error) {
    return { error: "Failed to read input file", ok: false };
  }
}

async function saveParsedInput<Data>(
  part: 1 | 2,
  day: number,
  year: number,
  parser: (input: string) => Data,
): Promise<HandledResult<Data>> {
  const input = await getInput(day, year);

  if (!input.ok) {
    return input;
  }

  const parsedData = parser(input.data);

  try {
    writeFileSync(
      generateParsedInputFilePath(day, part),
      JSON.stringify({ data: parsedData }),
    );
    return { data: parsedData, ok: true };
  } catch (error) {
    return { error: "Failed to save parsed input", ok: false };
  }
}

export async function getParsedInput<Data>(
  part: 1 | 2,
  day: number,
  year: number,
  parser: (input: string) => Data,
): Promise<HandledResult<Data>> {
  const filePath = generateParsedInputFilePath(day, part);

  try {
    console.log("Reading parsed input file...");
    const parsedData = readFileSync(filePath, "utf-8");
    return { data: JSON.parse(parsedData).data, ok: true };
  } catch (error) {
    return await saveParsedInput(part, day, year, parser);
  }
}
function generateParsedInputFilePath(day: number, part: 1 | 2): string {
  return resolve(`${process.env.PARSED_INPUT_DIR}/day${day}-part${part}.json`);
}

function generateInputFilePath(day: number): string {
  return resolve(`${process.env.INPUT_DIR}/day${day}.txt`);
}
