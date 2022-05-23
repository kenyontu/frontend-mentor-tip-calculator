type ValidateFunc = (v: string) => boolean

type ValidatorItem = {
  validate: ValidateFunc
  errorMessage: string
}

class Validator {
  validators: ValidatorItem[] = []

  isNotEmpty(errorMessage: string) {
    this.validators.push({
      validate: (v) => v.length > 0,
      errorMessage,
    })

    return this
  }

  isNot(value: string, errorMessage: string) {
    this.validators.push({
      validate: (v) => v !== value,
      errorMessage,
    })

    return this
  }

  isFloat(errorMessage: string) {
    this.validators.push({
      validate: (v) => !isNaN(parseFloat(v)),
      errorMessage,
    })

    return this
  }

  minFloat(minValue: number, errorMessage: string) {
    this.validators.push({
      validate: (v) => parseFloat(v) >= minValue,
      errorMessage,
    })

    return this
  }

  maxFloat(maxValue: number, errorMessage: string) {
    this.validators.push({
      validate: (v) => parseFloat(v) <= maxValue,
      errorMessage,
    })

    return this
  }

  addCustom(validate: ValidateFunc, errorMessage: string) {
    this.validators.push({
      validate,
      errorMessage,
    })

    return this
  }

  validate(value: string): null | string {
    for (let i = 0; i < this.validators.length; i++) {
      if (!this.validators[i].validate(value)) {
        return this.validators[i].errorMessage
      }
    }

    return null
  }
}

let billValidator: Validator | null = null

function getBillValidator(): Validator {
  if (billValidator === null) {
    billValidator = new Validator()
      .isNotEmpty("Can't be empty")
      .isFloat('Invalid value')
      .minFloat(0, "Can't be < 0")
  }

  return billValidator
}

let tipPercentageValidator: Validator | null = null

function getPercentageValidator() {
  if (tipPercentageValidator === null) {
    tipPercentageValidator = new Validator()
      .isNotEmpty("Can't be empty")
      .isFloat('Invalid value')
      .minFloat(0, "Can't be < 0")
      .maxFloat(100, "Can't be > 100")
  }

  return tipPercentageValidator
}

let peopleCountValidator: Validator | null = null

function getPeopleCountValidator() {
  if (peopleCountValidator === null) {
    peopleCountValidator = new Validator()
      .isNot('0', "Can't be zero")
      .addCustom((v) => {
        if (v.length === 0) return true

        return parseFloat(v) > 0
      }, "Can't be < 0")
  }

  return peopleCountValidator
}

export type { Validator }

export { getBillValidator, getPercentageValidator, getPeopleCountValidator }
