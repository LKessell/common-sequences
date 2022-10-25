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
  });
});
