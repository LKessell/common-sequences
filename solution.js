const { readFileSync } = require("fs");

function formatFile(path) {
  const rawContent = readFileSync(path, "utf-8");
  const contentByLine = rawContent.split(/\r?\n/);
  const punctuationless = contentByLine
    .join(" ")
    .replace(/[^\p{L}\p{N}\s]/gu, "");
  const lowercased = punctuationless.toLowerCase();
  const singleSpaced = lowercased.replace(/  +/g, " ");

  // console.log(singleSpaced.split(" ").slice(0, 50));
  // return singleSpaced.split(" ");
  return singleSpaced.split(" ").slice(0, 50);
}

function trackTripleInstances(list, key) {
  for (let i = 0; i < list.length - 3; i++) {
    const triple = `${list[i]} ${list[i + 1]} ${list[i + 2]}`;
    if (!key[triple]) key[triple] = 0;
    key[triple]++;
  }
}

function findTopTriplets() {
  const key = {};

  // formatFile(process.argv[2]);
  trackTripleInstances(formatFile(process.argv[2]), key);
  console.log(key);
}

findTopTriplets();
