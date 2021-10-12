/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  Account,
  useI18n,
} from '@sirclo/nexus'
import { toast } from 'react-toastify'
import {
  X as XIcon,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle,
  Crosshair,
  ChevronDown,
  ChevronRight,
  ChevronLeft
} from 'react-feather'
/* library template */
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
/* components */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Account.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import styleMapLocation from 'public/scss/components/MapLocation.module.scss'
import stylesPassword from 'public/scss/components/PasswordStrength.module.scss'
import stylesPaggination from 'public/scss/components/Paggination.module.scss'
// import stylesPopupConfirmationOrder from "public/scss/components/popupConfirmationOrder.module.scss"
// import stylesPopupCheckPaymentOrder from "public/scss/components/CheckPaymentOrder.module.scss"

const ACTIVE_CURRENCY = "IDR"

const classesAccount = {
  tabClassName: styles.account_tab,
  tabItemClassName: styles.account_tabItem,
  linkTabItemClassName: styles.account_linkTabItem,
  linkTabItemActiveClassName: styles.account_linkTabItemActive,

  /* my account classes */
  myAccountBodyClassName: styles.account_myAccountBody,
  myAccountLabelClassName: styles.account_myAccountLabel,
  myAccountFieldClassName: styles.account_myAccountField,
  myAccountValueClassName: styles.account_myAccountValue,
  inputContainerClassName: stylesForm.form_control,
  datePickerInputClassName: stylesForm.form_datePickerInput,
  datePickerCalendarClassName: stylesForm.form_datePickerCalendar,
  buttonClassName: `${stylesButton.btn_primaryLong} ${styles.account_button}`,

  // map
  mapSelectAreaClassName: stylesButton.btn_secondary,
  mapPopupClassName: styleMapLocation.mapPopup,
  mapNoteClassName: styleMapLocation.mapNote,
  mapAreaClassName: styleMapLocation.mapArea,
  mapPopupBackgroundClassName: styleMapLocation.mapPopupContainer,
  mapClassName: styleMapLocation.mapPopupMaps,
  mapHeaderWrapperClassName: styleMapLocation.mapPopupHeader,
  mapHeaderTitleClassName: styleMapLocation.mapPopupHeaderTitle,
  mapHeaderCloseButtonClassName: styleMapLocation.mapPopupClose,
  mapHeaderNoteClassName: styleMapLocation.mapPopupNote,
  mapLabelAddressClassName: styleMapLocation.mapPopupLabelAddress,
  mapCenterButtonClassName: styleMapLocation.mapPopupCenterButton,
  mapButtonFooterClassName: `${stylesButton.btn_primaryLong} ${styleMapLocation.mapButtonFooter}`,

  // /* order history classes */
  // orderHistoryContainerClassName: styles.table_orderhistory,
  // tableClassName: styles.table_history,
  // orderedItemDetailNeedReviewClassName: styles.table_itemDetailNeedReview,
  // orderedItemDetailDeliveredClassName: styles.table_orderedItemDetailDelivered,

  /* change password clases */
  inputLabelClassName: styles.account_edit__label,
  inputClassName: stylesForm.form_inputLong,
  changePasswordClassName: styles.account_changePassword,
  passwordContainerClassName: stylesForm.form_control,
  passwordInputClassName: styles.account_changePassword,
  passwordStrengthBarContainerClassName: stylesPassword.passwordStrength,
  passwordStrengthBarClassName: stylesPassword.passwordStrength_bar,
  passwordStrengthLabelClassName: stylesPassword.passwordStrength_label,
  passwordCriteriaClassName: stylesPassword.passwordStrength_criteriaItem,
  passwordCriteriaListClassName: stylesPassword.passwordStrength_criteria,
  
  // /* tracking */
  // shippingTrackerButton: `btn ${styles.btn_primary}`,
  // shipmentTrackingClassName: `${styles.track_shipmentTracking} ${styles.account_shipmentTracking}`,
  // shipmentHeaderClassName: `${styles.track_shipmentHeader} ${styles.account_shipmentContainer}`,
  // shipmentBodyClassName: `${styles.track_shipmentBody} ${styles.account_shipmentContainer} d-flex justify-content-center`,
  // shipmentFooterClassName: `${styles.track_shipmentFooter} ${styles.account_shipmentContainer} d-flex justify-content-center text-center`,
  // shipmentHeaderTextClassName: styles.track_shipmentHeaderText,
  // shipmentTextClassName: styles.track_shipmentText,
  // shipmentNoteClassName: styles.track_shipmentNote,
  // shipmentListClassName: styles.track_shipmentList,
  // shipmentListWrapperClassName: styles.track_shipmentListWrapper,
  // shipmentCloseIconClassName: styles.track_shipmentCloseIcon,
  // shipmentTrackButtonClassName: styles.track_shipmentTrackButton,

   /* Membership History */
  loyaltyPointContainerClassName: styles.account_loyalty,
  membershipStatusClassName: styles.membership_status,
  accordionClassName: styles.membership_accordion,
  accordionToggleClassName: styles.membership_accordionToggle,
  accordionIconClassName: styles.membership_accordionIcon,
  totalPointsClassName: styles.membership_totalPoints,
  membershipProgressClassName: styles.membership_progress,
  membershipPromptClassName: styles.membership_prompt,
  linkContinueClassName: styles.membership_linkContinue,
  membershipHistoryClassName: styles.membership_history,
  pointHistoryItemClassName: styles.membership_historyItem,
  orderIDClassName: styles.membership_orderID,
  transactionTypeClassName: styles.membership_transactionType,
  transactionDateClassName: styles.membership_transactionDate,
  pointDeltaClassName: styles.membership_point,
  membershipPaginationClassName: styles.membership_pagination,
  itemPerPageClassName: styles.membership_itemPerPage,
  itemPerPageLabelClassName: styles.membership_itemPerPageLabel,
  itemPerPageOptionsClassName: styles.membership_itemPerPageOptions,
  buttonContinueClassName: `btn ${styles.btn_primary} ${styles.btn_long}`,
  
  //order history info
  // orderInfoContainerClassName: styles.membership_info_container,
  // OrderInfoIconClassName: styles.membership_info_icon,
  // orderInfoLabelClassName: styles.membership_info_label,
  // OrderInfoSearchHereClassName: styles.membership_info_button,
  
  // popupConfirmationOrder
  // popupConfirmationOrderContainerClassName: stylesPopupConfirmationOrder.container,
  // popupConfirmationOrderContentClassName: stylesPopupConfirmationOrder.content,
  // popupConfirmationOrderTitleClassName: stylesPopupConfirmationOrder.title,
  // popupConfirmationOrderNoteClassName: stylesPopupConfirmationOrder.note,
  // popupConfirmationOrderDescriptionClassName: stylesPopupConfirmationOrder.description,
  // popupConfirmationOrderWrapButtonClassName: stylesPopupConfirmationOrder.wrapButton,
  // popupConfirmationOrderButtonConfirmClassName: stylesPopupConfirmationOrder.buttonNo,
  // popupConfirmationOrderButtonNoClassName: stylesPopupConfirmationOrder.buttonConfirm,
  
  
  //popupCheckPaymentOrder
  // checkPaymentOrderContainerClassName: stylesPopupCheckPaymentOrder.checkOrder_overlay,
  // checkPaymentOrderContainerBodyClassName: stylesPopupCheckPaymentOrder.checkOrder_container,
  // checkPaymentOrderHeaderClassName: stylesPopupCheckPaymentOrder.checkOrder_header,
  // checkPaymentOrderTitleClassName: stylesPopupCheckPaymentOrder.checkOrder_title,
  // checkPaymentOrderDescriptionClassName: stylesPopupCheckPaymentOrder.checkOrder_description,
  // checkPaymentOrderContentClassName: stylesPopupCheckPaymentOrder.checkOrder_content,
  // checkPaymentOrderInputContentClassName: stylesPopupCheckPaymentOrder.checkOrder_inputContent,
  // checkPaymentOrderInputTitleClassName: stylesPopupCheckPaymentOrder.checkOrder_inputTitle,
  // checkPaymentOrderInputClassName: stylesPopupCheckPaymentOrder.checkOrder_input,
  // checkPaymentOrderCloseButtonClassName: stylesPopupCheckPaymentOrder.checkOrder_closeButton,
  // checkPaymentOrderSubmitButtonClassName: stylesPopupCheckPaymentOrder.checkOrder_submitButton,

   /* setting notification */
   settingNotifContainer: "notification",
   settingNotifHeader: "d-none",
   settingNotifDescription: styles.notification_desc,
   settingNotifMediaDisabled: styles.notification_mediaDisable,
   mediaParent: styles.notification_mediaParent,
   mediaLabelContainer: styles.notification_mediaLabelContainer,
   mediaLabel: styles.notification_mediaLabel,
   mediaInnerLabelContainer: styles.notification_mediaInnerLabel,
   mediaDescription: styles.notification_mediaDesc,
   mediaCheckboxContainer: styles.notification_mediaCheckboxContainer,
   mediaCheckbox: styles.notification_mediaCheckbox,
   mediaCheckboxSlider: styles.notification_mediaCheckboxSlider,
   mediaDetailContainer: styles.notification_mediaDetailContainer,
   mediaDetailLabel: styles.notification_mediaDetailLabel,
   mediaDetailCheckboxContainer: styles.notification_mediaDetailCheckboxContainer,
   mediaDetailCheckbox: styles.notification_mediaDetailCheckbox,
   mediaDetailCheckboxLabel: styles.notification_mediaDetailCheckboxLabel
 
}

const orderHistoryPaginationClasses = {
  pagingClassName: stylesPaggination.pagination_paging,
  activeClassName: stylesPaggination.pagination_active,
  itemClassName: stylesPaggination.pagination_item,
}

const AccountsPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("account.account")}`]

  const [name, setName] = useState<string>("")

  const onError = (msg: string) => toast.error(msg)
  const onSuccessChPass = (msg: string) => toast.success(msg)

  const onSuccess = (msg: string, data: any) => {
    setName(data?.upsertProfile[0]?.firstName + " " + data?.upsertProfile[0]?.lastName)
    toast.success(msg)
  }

  const onFetchCompleted = (_: string, data: any) => {
    const { firstName, lastName } = data?.members[0]
    setName(`${firstName} ${lastName}`)
  }

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />

      <div className={styles.account_wrapper}>
        <div className={styles.account_container}>
          <h3 className={styles.account_name}>{name}</h3>
          <Account
            classes={classesAccount}
            orderHistoryPaginationClasses={orderHistoryPaginationClasses}
            currency={ACTIVE_CURRENCY}
            onFetchCompleted={onFetchCompleted}
            onErrorMsg={onError}
            onSuccessMsg={onSuccess}
            onSuccessChPass={onSuccessChPass}
            orderHistoryIsCallPagination={true}
            orderHistoryItemPerPage={10}
            paymentHrefPrefix="payment_notif"
            passwordViewIcon={<Eye />}
            passwordHideIcon={<EyeOff />}
            passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
            passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
            mapButtonCloseIcon={<XIcon />}
            mapCenterIcon={<Crosshair />}
            membershipPaginationClasses={orderHistoryPaginationClasses}
            membershipPaginationNextLabel={<ChevronRight/>}
            membershipPaginationPrevLabel={<ChevronLeft/>}
            showSettingNotification={true}
            icons={{
              accordionIcon: <ChevronDown size={20} color="#2296CB" />,
              closeIcon: <XIcon />,
              infoIcon: <AlertCircle />,
              iconTracker: <img src="/images/motorcycle.svg" alt="motorcycle" />,
              whatsApp: <img src="/images/whatsapp.png"/>,
              email: <img src="/images/email.png"/>
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req)

  if (res) {
    const cookies = parseCookies(req)
    const auth = cookies.AUTH_KEY

    if (!auth) {
      res.writeHead(301, {
        Location: `/${cookies.ACTIVE_LNG || "id"}/login`,
      })
      res.end()
    }
  }

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  }
}

export default AccountsPage
