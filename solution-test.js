var chai = require("chai");
var assert = chai.assert;

process.argv.push("test_data.txt");

var {
  formatFile,
  trackTripletInstances,
  findTopTriplets,
} = require("./solution");

describe("solution.js", function () {
  describe("formatFile", function () {
    it("Should be a function", function () {
      assert.isFunction(formatFile);
    });

    it("Should take in a file path and output an array of words, ignoring capitalization and punctuation", function () {
      const formattedText = formatFile("test_data.txt");
      assert.deepEqual(formattedText, [
        "this",
        "contains",
        "punctuation",
        "i",
        "do",
        "not",
      ]);
    });
  });
});
