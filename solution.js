const { readFileSync } = require("fs");

function formatFile(path) {
  const rawContent = readFileSync(path, "utf-8");
  const contentByLine = rawContent.split(/\r?\n/);
  const punctuationless = contentByLine
    .join(" ")
    .replace(/[^\p{L}\p{N}\s]/gu, "");
  const lowercased = punctuationless.toLowerCase();
  const singleSpaced = lowercased.replace(/  +/g, " ");

  return singleSpaced.split(" ");
}

function trackTripletInstances(list, key) {
  for (let i = 0; i < list.length - 3; i++) {
    const triplet = `${list[i]} ${list[i + 1]} ${list[i + 2]}`;
    if (!key[triplet]) key[triplet] = 0;
    key[triplet]++;
  }
}

function findTopTriplets() {
  const key = {};

  trackTripletInstances(formatFile(process.argv[2]), key);

  const sortedInstances = Object.entries(key).sort((a, b) => b[1] - a[1]);
  const topHundred = sortedInstances.slice(0, 100);

  console.log(topHundred);
  return topHundred;
}

findTopTriplets();
