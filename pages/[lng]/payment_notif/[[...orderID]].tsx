/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ChevronUp, ChevronDown } from 'react-feather'
import { 
  PaymentConfirmation, 
  useI18n, 
  CheckPaymentOrder 
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/PaymentNotif.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'

const classesPaymentConfirmation = {
  paymentConfirmationDivClassName: styles.paymentNotif_form,
  paymentInfoUploadClassName: styles.paymentNotif_info,
  inputContainerClassName: `${styles.sirclo_form_row} ${styles.paymentConfirmation}`,
  inputClassName: `form-control ${styles.sirclo_form_input}`,
  selectClassName: `form-control ${styles.sirclo_form_input}`,

  buttonConfirmClassName: styles.paymentConfirmation_buttonConfirm,
  detailContainerClassName: styles.paymentConfirmation_detailContainer,
  detailContentClassName: styles.paymentConfirmation_detailContent,
  detailHeaderClassName: styles.paymentConfirmation_detailHeader,
  detailTitleClassName: styles.paymentConfirmation_detailTitle,
  detailStatusClassName: styles.paymentConfirmation_detailStatus,
  detailTotalAmountClassName: styles.paymentConfirmation_detailTotalAmount,
  detailDropdownClassName: styles.paymentConfirmation_detailDropdown,
  detailItemClassName: styles.paymentConfirmation_detailItem,
  detailItemImgClassName: styles.paymentConfirmation_detailItemImg,
  detailItemLabelClassName: styles.paymentConfirmation_detailItemLabel,
  detailItemPriceClassName: styles.paymentConfirmation_detailItemPrice,
  detailPriceBreakdownClassName: styles.paymentConfirmation_detailPriceBreakdown,
  detailFieldClassName: styles.paymentConfirmation_detailField,
  detailTotalFieldClassName: styles.paymentConfirmation_detailTotalField,
  detailHeaderDropdownClassName: styles.paymentConfirmation_detailHeaderDropdown,
  detailBodyDropdownClassName: styles.paymentConfirmation_detailBodyDropdown,
  labelClassName: styles.paymentConfirmation_label,
}

const classesCheckPaymentOrder = {
  checkPaymentOrderCloseButtonClassName: styles.paymentConfirmation_checkPaymentOrderClose,
  checkPaymentOrderTitleClassName: styles.paymentConfirmation_title,
  checkPaymentOrderContainerClassName: styles.paymentConfirmation_checkOrderContainer,
  checkPaymentOrderDescriptionClassName: styles.paymentConfirmation_checkOrderDescription,
  checkPaymentOrderContentClassName: styles.paymentConfirmation_checkOrderContent,
  checkPaymentOrderInputTitleClassName: styles.paymentConfirmation_checkOrderTitle,
  checkPaymentOrderInputClassName: styles.paymentConfirmation_checkOrderInput,
  checkPaymentOrderSubmitButtonClassName: stylesButton.btn_primaryLong,
}

const PaymentConfirmationPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const router = useRouter()
  const linksBreadcrumb = [i18n.t("header.home"), i18n.t("paymentConfirm.confirm")]

  let orderID = ''

  if (router.query.orderID) {
    orderID = router.query.orderID.toString()
  }

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <section>
        <div className={styles.paymentConfirmation_container}>
          
          {orderID ? (
            <>
              <h3 className={styles.paymentConfirmation_title}>
                {i18n.t('paymentConfirm.heading')}
              </h3>
              <PaymentConfirmation
                orderIDProps={orderID}
                classes={classesPaymentConfirmation}
                orderDetailIcon={{
                  chevronUp: <ChevronUp/>,
                  chevronDown: <ChevronDown />
                }}
                onErrorMsg={(msg) => toast.error(msg)}
                onSuccessMsg={(msg) => toast.success(msg)}
                loadingComponent={<Loader color='text-light' />}
                errorComponent={<div>{i18n.t('global.error')}</div>}
                withOrderDetails
                thumborSetting={{
                  width: 40,
                  format: 'webp',
                  quality: 85,
                }}
              />
            </>
          ) : (
            <CheckPaymentOrder
              classes={classesCheckPaymentOrder}
              icon={{
                loading: (
                  <span className='spinner-border text-light mr-3' />
                ),
              }}
              onErrorMsg={(msg) => toast.error(msg)}
              // onSuccessMsg={(msg) => toast.success(msg)}
            />
          )}
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
    },
  }
}

export default PaymentConfirmationPage
