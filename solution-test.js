var chai = require("chai");
var assert = chai.assert;

var {
  formatFile,
  trackTripletInstances,
  formatSolution,
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

    it("Should add to any pre-existing sequence instances in the key", function () {
      const key = {
        "i do not": 2,
        "not this list": 1,
        "testing is fun": 1,
      };
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
        "i do not": 4,
        "not this list": 2,
        "testing is fun": 1,
        "do not this": 1,
        "this list i": 1,
        "list i do": 1,
        "do not list": 1,
      });
    });
  });

  describe("formatSolution", function () {
    it("Should be a function", function () {
      assert.isFunction(formatSolution);
    });

    it("Should take in a list of entries, and output the list in an Entry - Number format", function () {
      const entries = [
        ["testing is fun", 2],
        ["formatting is cool", 1],
      ];
      const solution = formatSolution(entries);

      assert.deepEqual(solution, [
        "testing is fun - 2",
        "formatting is cool - 1",
      ]);
    });
  });

  describe("findTopTriplets", function () {
    it("Should be a function", function () {
      assert.isFunction(findTopTriplets);
    });

    it("Should take in a file path from the command line and output a list of the most common three word sequences", function () {
      process.argv.push("test_data.txt");

      const solution = findTopTriplets();

      assert.deepEqual(solution, [
        "this contains punctuation - 1",
        "contains punctuation i - 1",
        "punctuation i do - 1",
        "i do not - 1",
      ]);
    });

    it("Should be able to create a list from more than one file path", function () {
      process.argv.push("test_data.txt");

      const solution = findTopTriplets();

      assert.deepEqual(solution, [
        "this contains punctuation - 2",
        "contains punctuation i - 2",
        "punctuation i do - 2",
        "i do not - 2",
      ]);
    });

    it("Should limit the list to the top 100 most common sequences", function () {
      process.argv.push("pride_and_prejudice.txt");

      const solution = findTopTriplets();

      assert.equal(solution.length, 100);
      assert.equal(solution[0], "i do not - 63");
    });
  });
});
