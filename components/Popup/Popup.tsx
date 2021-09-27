import { FC } from 'react'
import styles from 'public/scss/components/Popup.module.scss'

export type PopupPropsType = {
  title?: string,
  isOpen: boolean,
  setPopup: (value: boolean) => void,
  withClose?: boolean,
}

const Popup: FC<PopupPropsType> = ({
  title,
  isOpen,
  setPopup,
  withClose = true,
  children
}) => {

  const handleClick = (event: any) =>  event.target === event.currentTarget && setPopup(false)
  
  if(!isOpen) return <></>

  return (
    <div className={styles.popup_overlay} onClick={withClose && handleClick}>
      <div className={styles.popup_container}>
        <div className={styles.popup_header}>
          {title && <h3 className={styles.popup_title}>{title}</h3>}
          {withClose && <span className={styles.popup_close} />}
        </div>
        <div className={styles.popup_body}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Popup