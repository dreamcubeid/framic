/* library package */
import { FC, useState } from 'react'
import Router from 'next/router'
import { toast } from 'react-toastify'
import {
  ProductDetail,
  Tabs,
  useI18n
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
import formatPrice from 'lib/formatPrice'
/* component */
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import SocialShare from 'components/SocialShare'
import Placeholder from 'components/Placeholder'
import Popup from 'components/Popup/Popup'
/* styles */
import styles from 'public/scss/components/ProductDetail.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

type ProductDetailComponentType = {
  data: any
  lng: string,
  slug: string | string[]
  urlSite: string
}

interface IDataAddToCart {
  imageURL: string
  title: string
  discount: { value: number }
  price: { value: number }
  salePrice: { value: number }
}

const classesProductDetail = {
  productDetailParentDivClassName: styles.productdetail_wrapper,
  rowClassName: styles.productdetail_container,
  imageRowClassName: styles.productdetail_imageRow,
  propertyRowClassName: styles.productdetail_propertyRow,
  mainImageClassName: styles.productdetail_mainImage,
  thumbnailImageClassName: styles.productdetail_thumbnailImage,
  arrowClassName: styles.productdetail_arrow,
  detailTitleStarClassName: styles.productdetail_detailTitleStar,
  detailTitleStarNumberClassName: styles.productdetail_detailTitleStarNumber,
  detailTitleClassName: styles.productdetail_detailTitle,
  salePriceClassName: styles.productdetail_salePrice,
  priceClassName: styles.productdetail_priceSale,
  variantOptionsContainerClassName: styles.productdetail_variantOptionsContainer,
  propertyInnerContainerClassName: styles.productdetail_propertyInnerContainer,
  propertyFooterContainerClassname: styles.productdetail_propertyFooterContainer,
  variantLabelClassName: styles.productdetail_variantLabel,
  variantOptionsClassName: styles.productdetail_variantOption,
  descriptionClassName: styles.productdetail_description,
  additionalInfoClassName: "d-none",
  qtyBoxClassName: styles.productdetail_qtyBox,
  addToCartBtnClassName: `${stylesButton.btn_secondaryLong} ${styles.productdetail_propertyFooterButton}`,
  buyNowBtnClassName: `${stylesButton.btn_primaryLong} ${styles.productdetail_propertyFooterButton}`,
  dotClassName: styles.productdetail_dot,

  // openOrderClassName: styles.productdetail_openorder,
  // openOrderTitleClassName: styles.productdetail_openorder_title,
  // openOrderContainerClassName: styles.productdetail_openorder_container,
  // openOrderDateClassName: styles.productdetail_openorder_container__date,
  // openOrderTimeClassName: styles.productdetail_openorder_container__time,
  // countDownContainerClassName: styles.productdetail_openorder_countdown,
  // countDownItemClassName: styles.productdetail_openorder_countdownItem,
  // countDownItemTextClassName: styles.productdetail_openorder_countdownItem__text,
  // openOrderTimeoutClassName: styles.productdetail_openorder_timeout,
  // openOrderTimeoutDescClassName: styles.productdetail_openorder_timeout__desc,
  // openOrderTimeoutBtnClassName: `btn text-uppercase mt-3 ${styles.btn_primary} ${styles.btn_long}`,
  // variantContainerClassName: styles.productdetail_content_containerVariant,

  notifyMeLabelWrapperClassName: "d-none",
  notifyMeInputClassName: stylesForm.form_inputLong,
  notifyMeSubmitClassName: `${stylesButton.btn_primaryLong} ${styles.productdetail_notifyMeSubmit}`,
  // notifyMeClassName: styles.productdetail_notifyMe,
  // notifyMeOptionsClassName: styles.productdetail_notifyMeOptions,
  // notifyMeOptionClassName: styles.productdetail_notifyMeOption,
  // notifyMeRadioClassName: styles.productdetail_notifyMeRadio,
  // notifyMeRadioLabelClassName: styles.productdetail_notifyMeRadioLabel,
  // notifyMeInputWrapperClassName: styles.productdetail_notifyMeInputWrapper,
  // notifyMeLabelClassName: styles.productdetail_notifyMeLabel,
  // accordionClassName: styles.productdetail_content_desc_container,
  // // Estimate Shipping
  // estimateShippingWrapperClassName: stylesEstimate.wrapper,
  // estimateShippingTitleClassName: stylesEstimate.title,
  // estimateShippingDetailClassName: stylesEstimate.detail,
  // estimateShippingLogoClassName: stylesEstimate.detail_logo,
  // estimateShippingLogoImgClassName: stylesEstimate.detail_logoImage,
  // estimateShippingShowCourierClassName: stylesEstimate.detail_showCourier,
  // estimateShippingPopupContainerClassName: stylesEstimate.popup,
  // estimateShippingPopupContentClassName: stylesEstimate.popup_inner,
  // estimateShippingPopupHeaderClassName: stylesEstimate.popup_header,
  // estimateShippingPopupTitleClassName: stylesEstimate.popup_headerTitle,
  // estimateShippingPopupButtonCloseClassName: stylesEstimate.popup_headerClose,
  // estimateShippingPopupBodyClassName: stylesEstimate.popup_body,
  // estimateShippingPopupLineInfoClassName: stylesEstimate.popup_bodyLineInfo,
  // estimateShippingPopupLabelClassName: stylesEstimate.popup_bodyLabel,
  // estimateShippingPopupValueClassName: stylesEstimate.popup_bodyValue,
  // estimateShippingPopupProviderClassName: stylesEstimate.popup_provider,
  // estimateShippingPopupLineProviderClassName: stylesEstimate.popup_providerLine,
  // estimateShippingPopupProviderImgClassName: stylesEstimate.popup_providerImage,
  // estimateShippingPopupProviderLabelClassName: stylesEstimate.popup_providerLabel,
  // estimateShippingPopupProviderValueClassName: stylesEstimate.popup_providerValue,
}

const classesTabs = {
  tabContainerClassName: styles.productdetail_tabContainer,
  tabNavGroupClassName: styles.productdetail_tabNavGroup,
  tabNavClassName: styles.productdetail_tabNav,
  tabInnerClassName: styles.productdetail_tabInner,
}

const classesPlaceholder = {
  placeholderImage: `${styles.productdetail_placeholderImage} ${styles.productdetail_imageRow}`,
  placeholderList: styles.productdetail_placeholderList
}

const ProductDetailComponent: FC<ProductDetailComponentType> = ({
  data,
  slug,
  lng,
  urlSite
}) => {
  // variables
  const i18n: any = useI18n()
  const size = useWindowSize()
  const enableArrowDots = size.width && size.width < 768 ? true : false

  // state
  const [showPopupSuccessAddCart, setShowPopupSuccessAddCart] = useState<boolean>(false)
  const [showPopupSuccessNotify, setShowPopupSuccessNotify] = useState<boolean>(false)
  const [showPopupErrorAddCart, setShowPopupErrorAddCart] = useState<boolean>(false)
  const [showPopupErrorNotify, setShowPopupErrorNotify] = useState<boolean>(false)
  const [additionalInfo, setadditionalInfo] = useState<string>("")
  const [dataAddToCart, setDataAddToCart] = useState<IDataAddToCart>({
    imageURL: null,
    title: null,
    discount: { value: null },
    price: { value: null },
    salePrice: { value: null }
  })

  // function
  const tooglePopupSuccessAddCart = () => setShowPopupSuccessAddCart(!showPopupSuccessAddCart)
  const tooglePopupErrorAddCart = () => setShowPopupErrorAddCart(!showPopupErrorAddCart)
  const tooglePopupSuccessNotifyme = () => setShowPopupSuccessNotify(!showPopupSuccessNotify)
  const tooglePopupErrorNotifyme = () => setShowPopupErrorNotify(!showPopupErrorNotify)
  const handleSuccessAddToCart = (dataProduct: any) => {
    const dataAs = dataProduct?.saveCart?.lineItems || dataProduct?.saveCartByMemberID?.lineItems
    const detailProduct = dataAs?.filter((data: any) => data?.slug === slug)
    setDataAddToCart(detailProduct[0])
    tooglePopupSuccessAddCart()
  }

  if (data === null) return <EmptyComponent title={i18n.t("product.isEmpty")} />

  return (
    <>
      <ProductDetail
        slug={slug}
        withButtonBuyNow
        lazyLoadedImage={false}
        classes={classesProductDetail}
        isButton={{ 0: true, 1: true }}
        enableArrow={enableArrowDots}
        enableDots={enableArrowDots}
        enableTabs
        onCompleteMsg={tooglePopupSuccessNotifyme}
        onComplete={handleSuccessAddToCart}
        onErrorMsg={tooglePopupErrorNotifyme}
        onError={tooglePopupErrorAddCart}
        getAdditionalInfo={setadditionalInfo}
        prevIcon={<span className={styles.productdetail_arrowPrev} />}
        nextIcon={<span className={styles.productdetail_arrowNext} />}
        thumborSetting={{
          width: size.width < 768 ? 500 : 700,
          format: "webp",
          quality: 85
        }}
        customTabsComponent={
          <Tabs
            classes={classesTabs}
            tabs={[
              {
                tab: <p>{i18n.t("product.additionalInfo")}</p>,
                tabPanel: (
                  <div
                    className={styles.productdetail_tabAdditionalInfo}
                    dangerouslySetInnerHTML={{ __html: additionalInfo }}
                  />
                ),
              },
              {
                tab: <p>{i18n.t("product.review")}</p>,
                tabPanel: (
                  <div>
                    <p className="product-tabs_content--desc">on progress</p>
                  </div>
                )
              },
            ]}
          />
        }
        customDetailComponent={
          <div className={styles.productdetail_share}>
            <label className={styles.productdetail_shareTitle}>{i18n.t("product.shareProduct")}</label>
            <SocialShare urlSite={urlSite} />
          </div>
        }
        loadingComponent={
          <div className={styles.productdetail_container}>
            <Placeholder classes={classesPlaceholder} withImage />
            <div className={styles.productdetail_propertyRow}>
              <Placeholder classes={classesPlaceholder} withList listMany={5} />
            </div>
          </div>
        }
      // getProductID={(id) => setProductId(id)}
      // ratingIcon={<span className="ratingStar">&#x2605;</span>}
      // accordionIcon={<ChevronDown />}
      // withEstimateShipping={IS_PROD === "false" ? true : false}
      // notifyIcon={<Bell color="white" />}
      // openOrderIconDate={
      //   <Calendar
      //     className={styles.productdetail_openorder_container__icon}
      //   />
      // }
      // openOrderIconTime={
      //   <Clock
      //     className={styles.productdetail_openorder_container__icon}
      //   />
      // }
      />



      {/* PopUp Succes Add To Cart */}
      <Popup
        setPopup={tooglePopupSuccessAddCart}
        isOpen={showPopupSuccessAddCart}
        title={i18n.t("product.successAddToCart")}
        withClose={false}
      >
        <div className={styles.productdetail_popUpCartProductContainer}>
          <img
            src={dataAddToCart?.imageURL}
            className={styles.productdetail_popUpCartProductImage}
          />
          <div>
            <h3 className={styles.productdetail_popUpCartProductTitle}>
              {dataAddToCart?.title}
            </h3>
            <div className={styles.productdetail_popUpCartProductPriceContainer}>
              {dataAddToCart?.discount?.value !== 0 &&
                <p className={styles.productdetail_popUpCartProductPrice}>
                  {formatPrice(dataAddToCart?.price?.value, "IDR")}
                </p>
              }
              <p className={styles.productdetail_popUpCartProductSalePrice}>
                {formatPrice(dataAddToCart?.salePrice?.value, "IDR")}
              </p>
            </div>
          </div>
        </div>
        <button
          className={stylesButton.btn_primaryLongSmall}
          onClick={() => {
            tooglePopupSuccessAddCart()
            Router.push("/[lng]/cart", `/${lng}/cart`)
          }}>
          {i18n.t("orderSummary.viewCart")}
        </button>
        <button
          className={stylesButton.btn_textLongSmall}
          onClick={tooglePopupSuccessAddCart}>
          {i18n.t("global.continueShopping")}
        </button>
      </Popup>

      {/* PopUp Error Add To Cart  */}
      <Popup
        setPopup={tooglePopupErrorAddCart}
        isOpen={showPopupErrorAddCart}
        title={i18n.t("cart.errorSKUTitle")}
        withClose={false}
        maxWidth="308px"
      >
        <div className={styles.productdetail_popUpNotifymeContainer}>
          <p className={styles.productdetail_popUpNotifymeDesc}>{i18n.t("cart.errorSKUDesc")}</p>
          <button
            className={stylesButton.btn_primaryLongSmall}
            onClick={tooglePopupErrorAddCart}>
            {i18n.t("paymentStatus.tryAgain")}
          </button>
        </div>
      </Popup>

      {/* PopUp Success Notifyme */}
      <Popup
        setPopup={tooglePopupSuccessNotifyme}
        isOpen={showPopupSuccessNotify}
        title={i18n.t("product.notifyTitleSuccess")}
        withClose={false}
        maxWidth="308px"
      >
        <div className={styles.productdetail_popUpNotifymeContainer}>
          <p className={styles.productdetail_popUpNotifymeDesc}>{i18n.t("product.notifySuccess")}</p>
          <button
            className={stylesButton.btn_primaryLongSmall}
            onClick={tooglePopupSuccessNotifyme}>
            {i18n.t("global.continueShopping")}
          </button>
        </div>
      </Popup>

      {/* PopUp Error Notifyme */}
      <Popup
        setPopup={tooglePopupErrorNotifyme}
        isOpen={showPopupErrorNotify}
        title={i18n.t("product.notifyTitleError")}
        withClose={false}
        maxWidth="308px"
      >
        <div className={styles.productdetail_popUpNotifymeContainer}>
          <p className={styles.productdetail_popUpNotifymeDesc}>{i18n.t("product.notifyError")}</p>
          <button
            className={stylesButton.btn_primaryLongSmall}
            onClick={tooglePopupSuccessNotifyme}>
            {i18n.t("paymentStatus.tryAgain")}
          </button>
        </div>
      </Popup>
    </>
  )
}

export default ProductDetailComponent