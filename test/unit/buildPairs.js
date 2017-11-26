const { expect } = require("chai");
const { pairsForSlicing } = require('../../src/treeBuilder');

describe("Building section trees", function() {
  describe("Creating pairs for slicing from list", function() {
    const list = [1, 5, 10];

    it("creates three pairs", function() {
      expect(pairsForSlicing(list)).to.have.lengthOf(3);
    });

    it("pair one's last and pair two's first will be the same", function() {
      const [first, second, third] = pairsForSlicing(list);

      expect(first[1]).to.equal(second[0]);
      expect(second[1]).to.equal(third[0]);
    });

    it("last pair's should not be a pair, just single", function() {
      const [first, second, third] = pairsForSlicing(list);

      expect(third).to.have.lengthOf(1);
    });

    it("returns an empty list for invalid input", function() {
      expect(pairsForSlicing(undefined)).to.be.empty;
    });
  });

  describe("Transforming list of sections to tree", function() {

  });
});
