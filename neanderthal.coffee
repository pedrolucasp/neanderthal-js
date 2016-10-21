'use strict'
# Neanderthal JS
# Pedro Lucas Porcellis - pedrolucasporcellis@gmail.com
# 20/06/2016
# MIT License (see LICENSE)

class @Neanderthal

  ###
  # programSteps : Array {
  #   ["LDA", "128", "ADD", "10", "STA", 130, "HLT"]
  # }
  #
  # programMemory : Array {
  #   { memoryPosition: "128", value: "10" }
  # } 
  ###

  constructor: ->
    @programCounter = 0
    @accumulator    = 0
    @programSteps   = []
    @programMemory  = []

  @mnemonicsCodes = [
    {
      integerCode: 0,
      code: "NOP",
      needsParams: false,
      value: ->
    },
    {
      integerCode: 16,
      code: "STA",
      needsParams: true,
      value: (position) ->
        addData(position, @accumulator)
    },
    {
      integerCode: 32,
      code: "LDA",
      needsParams: true,
      value: (position) ->
        @accumulator = getDataValue(position)
        return
    },
    {
      integerCode: 48,
      code: "ADD",
      needsParams: true,
      value: (position) ->
        @accumulator += getDataValue(position)
        return
    },
    {
      integerCode: 64,
      code: "OR",
      needsParams: true,
      value: (position) ->
        @accumulator || getDataValue(position)
    },
    {
      integerCode: 80,
      code: "AND",
      needsParams: true,
      value: (position) ->
        @accumulator && getDataValue(position)
    },
    {
      integerCode: 96,
      code: "NOT",
      needsParams: false,
      value: ->
        @accumulator = !@accumulator
        return
    },
    {
      integerCode: 128,
      code: "JMP",
      needsParams: true,
      value: (position) ->
        execute(position);
    },
    {
      integerCode: 144,
      code: "JN",
      needsParams: true,
      value: (position) ->
        execute(position) if @accumulator < 0
    },
    {
      integerCode: 160,
      code: "JZ",
      needsParams: true,
      value: (position) ->
        execute(position) if @accumulator == 0
    },
    {
      integerCode: 244,
      code: "HLT",
      needsParams: false,
      value: ->
        exit();
    }
  ]

  # Instance Methods
  addNewStep: (code, memoryPosition) ->
    if typeof code is Number and code in (@mnemonicsCodes.map (o) -> return o.integerCode)
      @programSteps.push(code)
      @programSteps.push(memoryPosition)
      @isUsingMnemonics = false
      return
    else if typeof code is String and code in (@mnemonicsCodes.map (o) -> return o.value)
      @programSteps.push(code)
      @programSteps.push(memoryPosition)
      @isUsingMnemonics = true
      return

  addData: (memoryPosition, value) ->
    data = { memory: memoryPosition, value: value }
    index = @programMemory.map (programObject, index) ->
      return index if programObject.memoryPosition == memoryPosition and programObject.value != 0

    if index > 0 or index isnt null
      @programMemory.push data
    else
      @programMemory.splice index, 0, data

  getData: (memoryPosition) ->
    filteredProgramMemory = @programMemory.filter (programObject) ->
      return programObject if programObject.memory is memoryPosition

    return filteredProgramMemory[0]


  getDataValue: (memoryPosition) ->
    return 0 if this.getData(memoryPosition).value is null
    return this.getData(memoryPosition).value

  executeStep: (stepObject) ->
    if typeOfStep(stepObject) is "instruction"
      ###
      # find out what instruction is
      # execute the instruction code
      ###
    else
      ###
      # load the data referent to this memoryPosition
      # if programSteps(stepIndex - 1) is an instruction
      # that requires a parameter, pass to the function
      ###

  typeOfStep: (stepObject) ->
    if @isUsingMnemonics
      if isMnemonic(stepObject) then "instruction" else "data"
    else
      if isMnemonicIntegerCode(stepObject) then "instruction" else "data"

  isMnemonicIntegerCode: (code) ->
    return (code in @mnemonicsCodes.map (o) -> return o.integerCode)

  isMnemonic: (code) ->
    return (code in @mnemonicsCodes.map (o) -> return o.code)

  # Alias of #run()
  execute: ->
    run()

  run: ->
    # Implement

  exit: ->
    # Implement

  getProgramCounter: ->
    @programCounter

  getAccumulator: ->
    @accumulator

  getMemory: ->
    @programMemory

  resetProgram: (deep) ->
    @programCounter = 0
    @accumulator    = 0
    @programSteps   = [] if deep isnt null
    return

  reset: ->
    resetProgram(deep = true)
