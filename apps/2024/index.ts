import { config } from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

config(); // Load .env file

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option("day", {
      type: "number",
      demandOption: true,
      describe: "Day of the solution to run (1-25)",
    })
    .option("part", {
      type: "number",
      choices: [1, 2],
      demandOption: true,
      describe: "Part of the solution to run (1 or 2)",
    })
    .option("test", {
      type: "boolean",
      describe: "Run the test version of the solution",
    })
    .parseSync();

  const { day, part, test } = argv;

  if (day < 1 || day > 25) {
    console.error("Error: Invalid day. Please provide a day between 1 and 25.");
    return;
  }

  try {
    const modulePath = `./solutions/day${day}/part${part}`;
    const { default: solve, test: runTest } = await import(modulePath);

    if (test) {
      if (runTest) {
        runTest();
      } else {
        console.error(
          `Error: Test for part ${part} is not implemented for day ${day}.`,
        );
      }
    } else {
      solve();
    }
  } catch (error) {
    console.error(
      `Error: Unable to import solution for day ${day}, part ${part}.`,
      error,
    );
  }
}

// Execute main function
main();
