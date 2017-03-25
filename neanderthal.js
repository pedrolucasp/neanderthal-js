// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.Neanderthal = (function() {

    /*
     * programSteps : Array {
     *   [ "LDA", "128", "ADD", "10", "STA", 130, "HLT" ]
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
        code: "NOP",
        needsParams: false,
        value: function() {}
      }, {
        integerCode: 16,
        code: "STA",
        needsParams: true,
        value: function(position) {
          return addData(position, this.accumulator);
        }
      }, {
        integerCode: 32,
        code: "LDA",
        needsParams: true,
        value: function(position) {
          this.accumulator = getDataValue(position);
        }
      }, {
        integerCode: 48,
        code: "ADD",
        needsParams: true,
        value: function(position) {
          this.accumulator += getDataValue(position);
        }
      }, {
        integerCode: 64,
        code: "OR",
        needsParams: true,
        value: function(position) {
          return this.accumulator || getDataValue(position);
        }
      }, {
        integerCode: 80,
        code: "AND",
        needsParams: true,
        value: function(position) {
          return this.accumulator && getDataValue(position);
        }
      }, {
        integerCode: 96,
        code: "NOT",
        needsParams: false,
        value: function() {
          this.accumulator = !this.accumulator;
        }
      }, {
        integerCode: 128,
        code: "JMP",
        needsParams: true,
        value: function(position) {
          return execute(position);
        }
      }, {
        integerCode: 144,
        code: "JN",
        needsParams: true,
        value: function(position) {
          if (this.accumulator < 0) {
            return execute(position);
          }
        }
      }, {
        integerCode: 160,
        code: "JZ",
        needsParams: true,
        value: function(position) {
          if (this.accumulator === 0) {
            return execute(position);
          }
        }
      }, {
        integerCode: 244,
        code: "HLT",
        needsParams: false,
        value: function() {
          return exit();
        }
      }
    ];

    Neanderthal.prototype.addNewStep = function(code, memoryPosition) {
      if (typeof code === Number && indexOf.call(this.mnemonicsCodes.map(function(o) {
        return o.integerCode;
      }), code) >= 0) {
        this.programSteps.push(code);
        this.programSteps.push(memoryPosition);
        this.isUsingMnemonics = false;
      } else if (typeof code === String && indexOf.call(this.mnemonicsCodes.map(function(o) {
        return o.value;
      }), code) >= 0) {
        this.programSteps.push(code);
        this.programSteps.push(memoryPosition);
        this.isUsingMnemonics = true;
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
      if (typeOfStep(stepObject) === "instruction") {

        /*
         * find out what instruction is
         * execute the instruction code
         */
      } else {

        /*
         * load the data referent to this memoryPosition
         * if programSteps(stepIndex - 1) is an instruction
         * that require a parameter, pass it to the function
         */
      }
    };

    Neanderthal.prototype.typeOfStep = function(stepObject) {
      if (this.isUsingMnemonics) {
        if (isMnemonic(stepObject)) {
          return "instruction";
        } else {
          return "data";
        }
      } else {
        if (isMnemonicIntegerCode(stepObject)) {
          return "instruction";
        } else {
          return "data";
        }
      }
    };

    Neanderthal.prototype.isMnemonicIntegerCode = function(code) {
      return (indexOf.call(this.mnemonicsCodes.map(function(o) {
        return o.integerCode;
      }), code) >= 0);
    };

    Neanderthal.prototype.isMnemonic = function(code) {
      return (indexOf.call(this.mnemonicsCodes.map(function(o) {
        return o.code;
      }), code) >= 0);
    };

    Neanderthal.prototype.execute = function() {
      return run();
    };

    Neanderthal.prototype.run = function() {};

    Neanderthal.prototype.exit = function() {};

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
