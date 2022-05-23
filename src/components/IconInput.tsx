import { forwardRef } from 'react'
import classNames from 'classnames'
import styles from './IconInput.module.css'

type Props = {
  id: string
  iconSrc?: string
  hasError?: boolean
} & Omit<React.ComponentProps<'input'>, 'id'>

/**
 * Input component with an option to display an icon on the left
 */
const IconInput = forwardRef<HTMLInputElement, Props>(
  ({ id, iconSrc, hasError = false, className = '', ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={classNames(styles.container, className, {
          [styles.error]: hasError,
        })}
      >
        {iconSrc && <img src={iconSrc} alt="" />}
        <input
          ref={ref}
          id={id}
          className={styles.input}
          onFocus={(event) => event.target.select()}
          {...props}
        />
      </label>
    )
  }
)

export { IconInput }
