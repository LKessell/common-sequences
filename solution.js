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
  for (let index = 0; index <= list.length - 3; index++) {
    const triplet = `${list[index]} ${list[index + 1]} ${list[index + 2]}`;
    if (!key[triplet]) key[triplet] = 0;
    key[triplet]++;
  }
}

function findTopTriplets() {
  const key = {};

  process.argv.forEach((path) => {
    if (!path.includes(".txt")) return;
    else trackTripletInstances(formatFile(path), key);
  });

  const sortedInstances = Object.entries(key).sort((a, b) => b[1] - a[1]);
  const topHundred = sortedInstances.slice(0, 100);

  // console.log(topHundred);
  return topHundred;
}

findTopTriplets();

module.exports = {
  formatFile,
  trackTripletInstances,
  findTopTriplets,
};
