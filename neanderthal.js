// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.Neanderthal = (function() {

    /*
     * programSteps : Array {
     *   ["LDA", "128", "ADD", "10", "STA", 130, "HLT"]
     * }
     *
     * programMemory : Array {
     *   { memoryPosition: "128", value: "10" }
     * }
     */
    function Neanderthal() {
      this.programCounter = 0;
      this.accumulator = 0;
      this.programSteps = [];
      this.programMemory = [];
    }

    Neanderthal.mnemonicsCodes = [
      {
        integerCode: 0,
        value: "NOP"
      }, {
        integerCode: 16,
        value: "STA"
      }, {
        integerCode: 32,
        value: "LDA"
      }, {
        integerCode: 48,
        value: "ADD"
      }, {
        integerCode: 64,
        value: "OR"
      }, {
        integerCode: 80,
        value: "AND"
      }, {
        integerCode: 96,
        value: "NOT"
      }, {
        integerCode: 128,
        value: "JMP"
      }, {
        integerCode: 144,
        value: "JN"
      }, {
        integerCode: 160,
        value: "JZ"
      }, {
        integerCode: 244,
        value: "HLT"
      }
    ];

    Neanderthal.prototype.addNewStep = function(code, memoryPosition) {
      if (typeof code === Number && indexOf.call(this.mnemonicsCodes.map(function(o) {
        return o.integerCode;
      }), code) >= 0) {
        this.programSteps.push(code);
        return this.programSteps.push(memoryPosition);
      } else if (typeof code === String && indexOf.call(this.mnemonicsCodes.map(function(o) {
        return o.value;
      }), code) >= 0) {
        this.programSteps.push(code);
        return this.programSteps.push(memoryPosition);
      }
    };

    Neanderthal.prototype.addData = function(memoryPosition, value) {
      var data, index;
      data = {
        memory: memoryPosition,
        value: value
      };
      index = this.programMemory.map(function(programObject, index) {
        if (programObject.memoryPosition === memoryPosition && programObject.value !== 0) {
          return index;
        }
      });
      if (index > 0 || index !== null) {
        return this.programMemory.push(data);
      } else {
        return this.programMemory.splice(index, 0, data);
      }
    };

    Neanderthal.prototype.getData = function(memoryPosition) {
      var filteredProgramMemory;
      filteredProgramMemory = this.programMemory.filter(function(programObject) {
        if (programObject.memory === memoryPosition) {
          return programObject;
        }
      });
      return filteredProgramMemory[0];
    };

    Neanderthal.prototype.getDataValue = function(memoryPosition) {
      if (this.getData(memoryPosition).value === null) {
        return 0;
      }
      return this.getData(memoryPosition).value;
    };

    Neanderthal.prototype.executeStep = function(stepObject) {
      var typeOfStep;
      typeOfStep = typeOfStep(stepObject);
      if (typeOfStep === "instruction") {

        /*
         * find out what instruction is
         * execute the instruction code
         */
      } else {

        /*
         * load the data referent to this memoryPosition
         * if programSteps(stepIndex - 1) is an instruction
         * that requires a parameter, pass to the function
         */
      }
    };

    Neanderthal.prototype.typeOfStep = function(stepObject) {
      if (typeof stepObject === Number) {
        if (indexOf.call(this.mnemonicsCodes.map(function(o) {
          return o.integerCode;
        }), stepObject) >= 0) {
          return "instruction";
        }
        return "data";
      } else {
        return "instruction";
      }
    };

    Neanderthal.prototype.execute = function() {
      return run();
    };

    Neanderthal.prototype.run = function() {};

    Neanderthal.prototype.getProgramCounter = function() {
      return this.programCounter;
    };

    Neanderthal.prototype.getAccumulator = function() {
      return this.accumulator;
    };

    Neanderthal.prototype.getMemory = function() {
      return this.programMemory;
    };

    Neanderthal.prototype.resetProgram = function(deep) {
      this.programCounter = 0;
      this.accumulator = 0;
      if (deep !== null) {
        this.programSteps = [];
      }
    };

    Neanderthal.prototype.reset = function() {
      var deep;
      return resetProgram(deep = true);
    };

    return Neanderthal;

  })();

}).call(this);
