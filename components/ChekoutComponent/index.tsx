/* library package */
import { FC } from 'react'
import {
  useI18n,
  Logo
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import OrderSummaryBox from 'components/OrderSummaryBox'
/* styles */
import styles from 'public/scss/components/CheckoutComponent.module.scss'

type ChekoutComponentType = {
  page: "place_order"
  | "shipping_method"
  | "payment_method"
}

const ChekoutComponent: FC<ChekoutComponentType> = ({
  children,
  page
}) => {
  const i18n: any = useI18n()
  const size: any = useWindowSize();

  const stepsItem = [
    { page: 'place_order', title: i18n.t("placeOrder.userInformation") },
    { page: 'shipping_method', title: i18n.t("shipping.shippingMethod") },
    { page: 'payment_method', title: i18n.t("account.paymentMethod") }
  ]

  return (
    <div>
      <div className={styles.checkout_headerContainer}>
        <Logo
          imageClassName={styles.checkout_headerLogo}
          thumborSetting={{
            width: size.width < 575 ? 200 : 400,
            quality: 90
          }}
          lazyLoadedImage={false}
        />
      </div>

      <div className={styles.checkout_stepsContainer}>
        <ol className={styles.checkout_steps}>
          {stepsItem.map((value, index) => (
            <li
              key={index}
              className={`${styles.checkout_stepsItem} ${page === value.page ? "active" : ""}`}
            >{value.title}</li>
          ))}
        </ol>
        {stepsItem.map((value, index) => value.page === page && (
          <>
            <h3 key={index} className={styles.checkout_stepsTitle}>{value.title}</h3>
            {stepsItem.length > index &&
              <p key={index} className={styles.checkout_stepsTitleNext}>{i18n.t("product.next")}:&nbsp;{stepsItem[index + 1].title}</p>
            }
          </>
        ))}
      </div>

      <div className={styles.checkout_body}>
        <div className={styles.checkout_bodyChildren}>
          {children}
        </div>
        <div className={styles.checkout_bodyOrderSummaryBox}>
          <OrderSummaryBox page={page} />
        </div>
      </div>
    </div>
  )
}

export default ChekoutComponent