'use strict';

var chai = require('chai');
var expect = chai.expect;
var Neanderthal = require("./neanderthal.js").Neanderthal;

describe('Neanderthal', function () {
  describe("basic functions", function () {
    var neander = new Neanderthal();
    it('initialize programCounter and accumulator in zero', function () {
      expect(neander.getProgramCounter()).to.equal(0);
      expect(neander.getAccumulator()).to.equal(0);
    });

    it('add new item to memory program', function () {
      neander.addData(128, 15);
      expect(neander.getMemory()).to.contain({ memory: 128, value: 15 });
    });

    it('get stored value with memory position on program memory at a given memory position', function () {
      neander.addData(130, 50);
      expect(neander.getData(130)).to.deep.equal({ memory: 130, value: 50 });
    });

    it('get stored value only on program memory at a given memory position', function () {
      neander.addData(130, 50);
      expect(neander.getDataValue(130)).to.equal(50);
    });

  });
});
