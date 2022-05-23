import { useDeferredValue, useState } from 'react'

import styles from './App.module.css'
import logo from './assets/images/logo.svg'
import dollarIcon from './assets/images/icon-dollar.svg'
import personIcon from './assets/images/icon-person.svg'
import { IconInput } from './components/IconInput'
import { PercentageChooser } from './components/PercentageChooser'
import { Label } from './components/Label'
import { AutoSizeText } from './components/AutoSizeText'
import { useFormField } from './hooks/useFormField'
import {
  getBillValidator,
  getPercentageValidator,
  getPeopleCountValidator,
} from './utils/validator'
import { calculateTipPerPerson } from './utils/tip'

function App() {
  const [isCustom, setIsCustom] = useState(false)
  const bill = useFormField({ validator: getBillValidator() })
  const tipPercentage = useFormField({ validator: getPercentageValidator() })
  const peopleCount = useFormField({ validator: getPeopleCountValidator() })

  let result = { tip: 0, total: 0 }
  if (
    bill.isDirty &&
    tipPercentage.isDirty &&
    bill.error === null &&
    tipPercentage.error === null &&
    peopleCount.error === null
  ) {
    result = calculateTipPerPerson({
      bill: parseFloat(bill.value),
      percentage: parseFloat(tipPercentage.value),
      peopleCount:
        peopleCount.value.length > 0 ? parseInt(peopleCount.value) : 1,
    })
  }

  const defResult = useDeferredValue(result)

  const isResetDisabled = useDeferredValue(
    !(bill.isDirty || tipPercentage.isDirty || peopleCount.isDirty)
  )

  return (
    <>
      <header>
        <h1>
          <img className={styles.logo} src={logo} alt="Splitter logo" />
        </h1>
      </header>
      <main className={styles.container}>
        <div className={styles.inputSection}>
          <Label
            htmlFor="bill"
            className={styles.label}
            errorMessage={bill.error}
          >
            Bill
          </Label>
          <IconInput
            id="bill"
            type="number"
            className={styles.input}
            iconSrc={dollarIcon}
            placeholder="0"
            value={bill.value}
            onChange={bill.onChange}
            hasError={Boolean(bill.error)}
          />
          <Label className={styles.label} errorMessage={tipPercentage.error}>
            Select Tip %
          </Label>
          <PercentageChooser
            className={styles.percentageChooser}
            value={tipPercentage.value}
            onChange={tipPercentage.onChange}
            isCustom={isCustom}
            setIsCustom={setIsCustom}
            hasError={Boolean(tipPercentage.error)}
          />
          <Label
            htmlFor="peopleCount"
            className={styles.label}
            errorMessage={peopleCount.error}
          >
            Number of People
          </Label>
          <IconInput
            id="peopleCount"
            type="number"
            className={styles.input}
            iconSrc={personIcon}
            value={peopleCount.value}
            hasError={Boolean(peopleCount.error)}
            onChange={peopleCount.onChange}
            placeholder="1"
          />
        </div>
        <div className={styles.resultSection}>
          <div className={styles.resultRow}>
            <div>
              <span>Tip Amount</span>
              <span>/ person</span>
            </div>
            <AutoSizeText
              className={styles.resultText}
            >{`$${defResult.tip.toFixed(2)}`}</AutoSizeText>
          </div>
          <div className={styles.resultRow}>
            <div>
              <span>Total</span>
              <span>/ person</span>
            </div>
            <AutoSizeText className={styles.resultText}>
              {`$${defResult.total.toFixed(2)}`}
            </AutoSizeText>
          </div>
          <button
            className={isResetDisabled ? styles.disabled : ''}
            onClick={(event) => {
              bill.reset()
              tipPercentage.reset()
              peopleCount.reset()
              setIsCustom(false)
              // Removes focus from this button
              event.currentTarget.blur()
            }}
            tabIndex={isResetDisabled ? -1 : 0}
          >
            Reset
          </button>
        </div>
      </main>
    </>
  )
}

export default App
