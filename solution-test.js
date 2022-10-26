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

  describe("trackTripletInstances", function () {
    it("Should be a function", function () {
      assert.isFunction(trackTripletInstances);
    });

    it("Should take in a list of words and a key; instances of three word sequences should be tracked in the key", function () {
      const key = {};
      const sampleList = [
        "i",
        "do",
        "not",
        "this",
        "list",
        "i",
        "do",
        "not",
        "list",
      ];

      trackTripletInstances(sampleList, key);

      assert.deepEqual(key, {
        "i do not": 2,
        "do not this": 1,
        "not this list": 1,
        "this list i": 1,
        "list i do": 1,
        "do not list": 1,
      });
    });
  });
});
