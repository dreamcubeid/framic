/* library package */
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ProductDetail,
  Tabs,
  useI18n
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import EmptyComponent from 'components/EmptyComponent/EmptyComponent'
import SocialShare from 'components/SocialShare'
import Placeholder from 'components/Placeholder'

/* styles */
import styles from 'public/scss/components/ProductDetail.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'

type ProductDetailComponentType = {
  data: any
  slug: string | string[]
  urlSite: string
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
  addToCartBtnClassName: stylesButton.btn_primaryLong,
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
  // buyNowBtnClassName: `btn  text-uppercase ${styles.btn_long} ${styles.btn_primary} ${styles.btn_full_width}`,
  // notifyMeClassName: styles.productdetail_notifyMe,
  // notifyMeOptionsClassName: styles.productdetail_notifyMeOptions,
  // notifyMeOptionClassName: styles.productdetail_notifyMeOption,
  // notifyMeRadioClassName: styles.productdetail_notifyMeRadio,
  // notifyMeRadioLabelClassName: styles.productdetail_notifyMeRadioLabel,
  // notifyMeInputWrapperClassName: styles.productdetail_notifyMeInputWrapper,
  // notifyMeLabelClassName: styles.productdetail_notifyMeLabel,
  // notifyMeInputClassName: `form-control ${styles.sirclo_form_input}`,
  // notifyMeSubmitClassName: `btn mt-3 ${styles.btn_primary} ${styles.btn_long} w-100`,
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
};

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
  urlSite
}) => {
  const i18n: any = useI18n()
  const size = useWindowSize();
  const [showPopupNotify, setShowPopupNotify] = useState<boolean>(false);
  const [additionalInfo, setadditionalInfo] = useState<string>("")

  if (data === null) return <EmptyComponent title={i18n.t("product.isEmpty")} />

  return (
    <div>
      <ProductDetail
        slug={slug}
        withButtonBuyNow
        lazyLoadedImage={false}
        classes={classesProductDetail}
        isButton={{ 0: true, 1: true }}
        enableArrow={size.width && size.width < 768 ? true : false}
        enableDots={size.width && size.width < 768 ? true : false}
        enableTabs
        onCompleteMsg={() => setShowPopupNotify(true)}
        onErrorMsg={(msg) => msg && toast.error(msg)}
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
        // onComplete={() => setShowPopup(true)}
        // onError={() => setShowModalErrorAddToCart(true)}
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
    </div>
  )
}

export default ProductDetailComponent