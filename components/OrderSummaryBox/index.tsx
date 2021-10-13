import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import {
  useI18n,
  // CartDetails,
  OrderSummary
} from '@sirclo/nexus'
/* styles */
import styles from 'public/scss/components/OrderSummaryBox.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

export type OrderSummaryBoxPropsType = {
  page: "cart"
  | "place_order"
  | "shipping_method"
  | "payment_method"
}

const classesOrderSummary = {
  containerClassName: styles.ordersummary_container,
  headerClassName: styles.ordersummary_header,
  subTotalClassName: styles.ordersummary_subTotal,
  expandedDivClassName: styles.ordersummary_expandedDiv,
  subTotalTextClassName: styles.ordersummary_subTotalText,
  subTotalPriceClassName: styles.ordersummary_subTotalPrice,
  footerClassName: styles.ordersummary_footer,
  expandedLabelClassName: styles.ordersummary_expandedLabel,
  expandedPriceClassName: styles.ordersummary_expandedPrice,
  voucherTextClassName: styles.ordersummary_voucherText,
  voucherButtonClassName: styles.ordersummary_voucherButton,
  voucherButtonAppliedClassName: styles.ordersummary_voucherButtonApplied,
  voucherAppliedTextClassName: styles.ordersummary_voucherAppliedText,
  submitButtonClassName: stylesButton.btn_primaryLong,
  expandButtonClassName: styles.ordersummary_expandButton,

  popupClassName: styles.ordersummary_popup,
  voucherContainerClassName: styles.ordersummary_voucherContainer,
  closeButtonClassName: styles.ordersummary_closeButton,
  voucherFormClassName: styles.ordersummary_voucherForm,
  voucherInputClassName: stylesForm.form_inputLong,
  voucherSubmitButtonClassName: stylesButton.btn_primary,
  voucherListHeaderClassName: styles.ordersummary_voucherListHeader,
  voucherDetailClassName: styles.ordersummary_voucherDetail,
  voucherClassName: styles.ordersummary_voucher,
  voucherDetailHeaderClassName: styles.ordersummary_voucherDetailHeader,
  voucherDetailEstimateClassName: styles.ordersummary_voucherDetailEstimate,
  voucherDetailDescClassName: styles.ordersummary_voucherDetailDesc,
  voucherDetailTitleClassName: styles.ordersummary_voucherDetailTitle,
  voucherDetailCodeClassName: styles.ordersummary_voucherDetailCode,
  voucherDetailEstimateDescClassName: styles.ordersummary_voucherDetailEstimateDesc,
  voucherListClassName: styles.ordersummary_voucherList,
  deductionPriceClassName: styles.ordersummary_deductionPrice,

  pointsButtonClassName: styles.ordersummary_pointsButton,
  pointsTextClassName: styles.ordersummary_pointsText,
  pointsContainerClassName: styles.ordersummary_pointsContainer,
  numberOfPointsClassName: styles.ordersummary_numberOfPoints,
  pointLabelClassName: styles.ordersummary_pointLabel,
  totalPointsClassName: styles.ordersummary_totalPoints,
  pointValueClassName: styles.ordersummary_pointValue,
  pointsFormClassName: styles.ordersummary_pointsForm,
  changePointsClassName: styles.ordersummary_changePoints,
  pointsWarningClassName: styles.ordersummary_pointsWarning,
  pointsSubmitButtonClassName: stylesButton.btn_primaryLong,
  
  
  // continueShoppingClassName: "d-none",
  // labelClassName: "order-summary__popup--points-label",
  // valueClassName: "order-summary__popup--points-value",
  // /* pop up */
  // voucherFormContainerClassName: "order-summary__popup-form-container w-100",
  // /* voucher */
  // voucherButtonRemoveClassName: "orderSummary_voucherButtonRemove",
  // voucherFooterClassName: "order-summary__popup--voucher-footer",
  // voucherApplyButtonClassName: "order-summary__popup--voucher-button btn btn-blackOuter d-flex flex-row align-items-center justify-content-center flex-nowrap text-center",

  // /* point */
  // pointButtonRemoveClassName: "orderSummary_voucherButtonRemove",
  // pointsIconClassName: "order-1 mr-2 order-summary__header--features-icon",
  // pointsButtonAppliedClassName: "col-12 order-summary_voucherButtonApplied b-left",
  // pointsAppliedTextClassName: "order-summary_voucherAppliedText text-uppercase order-1",
  // pointsFormContainerClassName: "order-summary__popup-form-container w-100 mb-3",
  // pointsInsufficientClassName: "order-summary__popup--points-insufficient w-100 d-flex flex-row align-items-center justify-content-cente",
  // pointEarnedBannerClassName: "order-summary__pointEarned w-100"
}

const OrderSummaryBox: FC<OrderSummaryBoxPropsType> = ({
  page,
}) => {
  const i18n: any = useI18n()
  const [showModalErrorAddToCart, setShowModalErrorAddToCart] = useState<boolean>(false)

  return (
    <OrderSummary
      classes={classesOrderSummary}
      currency="IDR"
      submitButtonLabel={i18n.t("orderSummary.placeOrder")}
      continueShoppingLabel={i18n.t("orderSummary.continueShopping")}
      page={page}
      onSaveCartError={() => toast.error(i18n.t("global.error"))}
      onErrorMsg={() => setShowModalErrorAddToCart(!showModalErrorAddToCart)}
      onErrorMsgCoupon={(msg) => toast.error(msg)}
      isAccordion
      onAddressInvalid={(e) => toast.error(e)}
      icons={{
        voucher: <span className={styles.ordersummary_voucherIcon} />,
        points:  <span className={styles.ordersummary_pointsIcon} />,
        pointsApplied: <i className="fa fa-crown"></i>,
        close: <span className={styles.ordersummary_closeIcon} />,
        voucherApplied: <span className={styles.ordersummary_voucherIconApplied} />,
        voucherRemoved: <span className={styles.ordersummary_voucherIconRemove} />,
        expand:  <span className={styles.ordersummary_detailExpandIcon} />,
        collapse: <span className={styles.ordersummary_detailCollapseIcon} />,
      }}
      loadingComponent={<div className="spinner-border" />}
    />
  )
}

export default OrderSummaryBox
