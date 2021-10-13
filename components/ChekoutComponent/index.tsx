/* library package */
import { FC } from 'react'
import Link from 'next/link'
import {
  useI18n,
  Logo,
  CustomerDetail,
  useShippingMethod
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
import formatPrice from 'lib/formatPrice'
/* component */
import OrderSummaryBox from 'components/OrderSummaryBox'
/* styles */
import styles from 'public/scss/components/CheckoutComponent.module.scss'

type ChekoutComponentType = {
  lng: string
  page: "place_order"
  | "shipping_method"
  | "payment_method"
}

const classesCustomerDetail = {
  customerDetailBoxClass: styles.checkout_customerDetailBox,
  addressValueClassName: styles.checkout_addressValue,
  // addressContainerClassName: styles.customer_info,
  // addressDetailClassName: styles.customer_infoPerson,
  // changePinClassName: styles.customer_changePin,
  // mapPopupClassName: styles.customer_mapPopup,
  // mapPopupBackgroundClassName: styles.customer_mapPopupContainer,
  // mapClassName: styles.customer_mapPopupMaps,
  // mapHeaderWrapperClassName: styles.customer_mapPopupHeader,
  // mapHeaderTitleClassName: styles.customer_mapPopupHeaderTitle,
  // mapHeaderCloseButtonClassName: styles.customer_mapPopupClose,
  // mapHeaderNoteClassName: styles.customer_mapPopupNote,
  // mapLabelAddressClassName: styles.customer_mapPopupLabelAddress,
  // mapButtonFooterClassName: `btn ${styles.btn_primary} ${styles.btn_long} d-block mx-auto my-3`,
  // mapCenterButtonClassName: styles.customer_mapPopupCenterButton
};

const ChekoutComponent: FC<ChekoutComponentType> = ({
  children,
  lng,
  page
}) => {
  const i18n: any = useI18n()
  const size: any = useWindowSize();
  const { data } = useShippingMethod();

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
              className={`
                ${styles.checkout_stepsItem} 
                ${stepsItem.findIndex(value => value.page === page) >= index && "active"}
              `}
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
          {page !== "place_order" &&
            <div className={styles.checkout_customerDetailBoxWrapper}>
              <div className={styles.checkout_customerDetailBoxContainer}>
                <div className={styles.checkout_customerDetailBoxHeader}>
                  <label className={styles.checkout_customerDetailBoxHeaderLabel}>
                    {i18n.t("placeOrder.userInformation")}
                  </label>
                  <Link href="/id/place_order" as={`/${lng}/place_order`}>
                    <a className={styles.checkout_customerDetailBoxHeaderLink}>
                      {i18n.t("global.changes")}
                    </a>
                  </Link>
                </div>
                <div className={styles.checkout_customerDetailBoxInfoContainer}>
                  <div>
                    <label className={styles.checkout_customerDetailContactInfoLabel}>
                      {i18n.t("shipping.contactInfo")}
                    </label>
                    <CustomerDetail
                      classes={classesCustomerDetail}
                      isBilling={true}
                    />
                  </div>
                  <div>
                    <label className={styles.checkout_customerDetailShippingLabel}>
                      {i18n.t("shipping.shipTo")}
                    </label>
                    <CustomerDetail
                      classes={classesCustomerDetail}
                      isBilling={false}
                    />
                  </div>
                </div>
              </div>
              {page === "payment_method" &&
                <div>
                  <h3 className={styles.shippingDetails_provider}>
                    {data?.shippingMethod?.shippingProvider}{" "}{data?.shippingMethod?.shippingService}
                  </h3>
                  <h3 className={styles.shippingDetails_cost}>
                    {" - "}{formatPrice(data?.shippingMethod?.shippingCost, "IDR")}
                  </h3>
                </div>
              }
            </div>
          }
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