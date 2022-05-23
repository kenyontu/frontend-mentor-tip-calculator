import { ComponentProps } from 'react'
import classNames from 'classnames'

import styles from './AutoSizeText.module.css'

type Props = ComponentProps<'span'>

function AutoSizeText({ children, className, ...props }: Props) {
  const scale = Math.min(1, 7 / (children as string).length)

  return (
    <span
      className={classNames(styles.text, className)}
      style={{ transform: `scale(${scale})` }}
      {...props}
    >
      {children}
    </span>
  )
}

export { AutoSizeText }
