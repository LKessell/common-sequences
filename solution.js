const { readFileSync } = require("fs");

function formatFile(path) {
  const rawContent = readFileSync(path, "utf-8");
  const contentByLine = rawContent.split(/\r?\n/);
  const punctuationless = contentByLine
    .join(" ")
    .replace(/[^\p{L}\p{N}\s]/gu, "");
  const lowercased = punctuationless.toLowerCase();
  const singleSpaced = lowercased.replace(/  +/g, " ");

  console.log(singleSpaced.split(" ").slice(0, 50));
  return singleSpaced.split(" ");
}

function findTopTriplets() {
  formatFile(process.argv[2]);
}

findTopTriplets();
