import * as React from 'react'
import { useState, useEffect } from 'react'

import { IAlert } from '@juntossomosmais/venice-types'
import classNames from 'classnames/bind'

import styles from '@venice/styles/components/Alert.module.scss'

import {
  Alert as AlertIcon,
  FeaturedStar,
  Bell,
  Check,
  TimesCircle,
} from '../Icons'

export const VALID_COLORS = ['primary', 'secondary', 'success', 'danger']
export const TYPES = {
  default: {
    color: 'primary',
    icon: <AlertIcon />,
  },
  success: {
    color: 'success',
    icon: <Check />,
  },
  danger: {
    color: 'danger',
    icon: <AlertIcon />,
  },
  toast: {
    icon: <Bell />,
    closable: true,
  },
  featured: {
    icon: <FeaturedStar />,
    color: 'secondary',
  },
}

interface IAlertProps extends IAlert {
  /** React Element */
  icon?: React.ReactNode
}

export const Alert: React.FunctionComponent<
  IAlertProps & React.HTMLProps<HTMLDivElement>
> = ({
  children,
  className,
  icon,
  color = '',
  closable,
  onClose,
  type = '',
  ...rest
}) => {
  const [closed, setClosed] = useState(false)

  const selfType = TYPES[type.toLocaleLowerCase()] || TYPES.default
  const selfIcon = icon ?? selfType.icon
  const selfColor = VALID_COLORS.includes(color.toLocaleLowerCase())
    ? color
    : selfType.color || TYPES.default.color
  const isClosable = (closable ?? selfType.closable) || Boolean(onClose)
  useEffect(() => {
    if (closed && onClose) onClose()
  }, [closed])

  const styleContainer = classNames(
    styles.alert,
    styles[selfColor],
    {
      [styles['with-icon']]: Boolean(selfIcon),
      [styles['with-close']]: isClosable,
    },
    className
  )
  return closed ? null : (
    <div className={styleContainer} {...rest}>
      {selfIcon && React.isValidElement(selfIcon) && (
        <span className={classNames(styles.icon, styles['icon-alert'])}>
          {selfIcon}
        </span>
      )}
      <div>{children}</div>
      {isClosable && (
        <span
          className={classNames(styles.icon, styles['icon-close'])}
          onClick={() => setClosed(true)}
        >
          <TimesCircle />
        </span>
      )}
    </div>
  )
}