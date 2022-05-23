import { ComponentProps } from 'react'
import classNames from 'classnames'

import styles from './Label.module.css'

type Props = {
  errorMessage: string | null
} & ComponentProps<'label'>

function Label({ errorMessage, children, className = '', ...props }: Props) {
  const hasError = typeof errorMessage === 'string'

  return (
    <label className={classNames(styles.label, className)} {...props}>
      {children}
      <span className={classNames(styles.error, { [styles.show]: hasError })}>
        {errorMessage}
      </span>
    </label>
  )
}

export { Label }
