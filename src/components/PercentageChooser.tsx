import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'

import styles from './PercentageChooser.module.css'
import { IconInput } from './IconInput'

const PRE_DEFINED_PERCENTAGES = ['5', '10', '15', '25', '50']

type Props = {
  value: string
  onChange: (value: string) => void
  isCustom: boolean
  setIsCustom: (value: boolean) => void
  className?: string
  hasError?: boolean
}

function PercentageChooser({
  value,
  onChange,
  isCustom,
  setIsCustom,
  className = '',
  hasError,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isCustom) {
      inputRef.current?.focus()
    }
  }, [inputRef, isCustom])

  return (
    <div className={classNames(styles.container, className)} role="radiogroup">
      {PRE_DEFINED_PERCENTAGES.map((perc) => (
        <div key={perc} className={styles.option}>
          <input
            type="radio"
            name="percentage"
            id={`perc-${perc}`}
            checked={!isCustom && perc === value}
            onChange={() => {
              setIsCustom(false)
              onChange(perc)
            }}
          />
          <label htmlFor={`perc-${perc}`}>{perc}%</label>
        </div>
      ))}
      <div className={styles.customContainer}>
        <button
          className={classNames({ [styles.hide]: isCustom })}
          onClick={() => {
            setIsCustom(true)
            onChange('')
          }}
        >
          Custom
        </button>
        <IconInput
          type="number"
          id="customPercentage"
          ref={inputRef}
          value={value}
          placeholder="0"
          onChange={(event) => onChange(event.target.value)}
          hasError={hasError}
          tabIndex={isCustom ? 0 : -1}
        />
      </div>
    </div>
  )
}

export { PercentageChooser }
