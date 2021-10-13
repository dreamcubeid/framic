/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import { toast } from 'react-toastify'
import {
  useI18n,
  PlaceOrderForm,
  PrivateRoute
} from '@sirclo/nexus'
import {
  X as XIcon,
  CheckCircle,
  Crosshair,
} from 'react-feather'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import ChekoutComponent from 'components/ChekoutComponent'
/* styles */
import styles from 'public/scss/pages/Placeorder.module.scss'
import styleMapLocation from 'public/scss/components/MapLocation.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'

const LoaderPages = dynamic(() => import("components/Loader/LoaderPages"))

type PrivateComponentPropsType = {
  children: any
}

const classesPlaceOrderForm = {
  formGroupClassName: stylesForm.form_control,
  inputClassName: stylesForm.form_inputLong,
  shippingCheckboxLabelClassName: styles.placeorder_shippingCheckboxLabel,
  mapSelectAreaClassName: stylesButton.btn_secondaryLongSmall,
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
}

const PrivateRouteWrapper = ({ children }: PrivateComponentPropsType) => (
  <PrivateRoute
    page="place_order"
    loadingComponent={<LoaderPages />}
    redirectCart="products"
  >
    {children}
  </PrivateRoute>
)

const PlaceOrderPage: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  return (
    <PrivateRouteWrapper>
      <Layout
        i18n={i18n}
        lng={lng}
        lngDict={lngDict}
        brand={brand}
        withHeader={false}
        withFooter={false}
      >
        <ChekoutComponent page="place_order">
          <PlaceOrderForm
            classes={classesPlaceOrderForm}
            passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
            passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
            onErrorMsg={(msg) => toast.error(msg)}
            mapButtonCloseIcon={<XIcon />}
            mapCenterIcon={<Crosshair />}
          />
        </ChekoutComponent>
      </Layout>
    </PrivateRouteWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  }
}

export default PlaceOrderPage
