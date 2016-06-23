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
      value: "NOP"
    },
    {
      integerCode: 16,
      value: "STA"
    },
    {
      integerCode: 32,
      value: "LDA"
    },
    {
      integerCode: 48,
      value: "ADD"
    },
    {
      integerCode: 64,
      value: "OR"
    },
    {
      integerCode: 80,
      value: "AND"
    },
    {
      integerCode: 96,
      value: "NOT"
    },
    {
      integerCode: 128,
      value: "JMP"
    },
    {
      integerCode: 144,
      value: "JN"
    },
    {
      integerCode: 160,
      value: "JZ"
    },
    {
      integerCode: 244,
      value: "HLT"
    }
  ]

  # Instance Methods
  addNewStep: (code, memoryPosition) ->
    if typeof code is Number and code in (@mnemonicsCodes.map (o) -> return o.integerCode)
      @programSteps.push(code)
      @programSteps.push(memoryPosition)
    else if typeof code is String and code in (@mnemonicsCodes.map (o) -> return o.value)
      @programSteps.push(code)
      @programSteps.push(memoryPosition)

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
    typeOfStep = typeOfStep(stepObject)
    if typeOfStep is "instruction"
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
    if typeof stepObject is Number
      return "instruction" if stepObject in (@mnemonicsCodes.map (o) -> return o.integerCode)
      "data"
    else
      "instruction"


  # Alias of #run()
  execute: ->
    run()

  run: ->
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
