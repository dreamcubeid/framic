/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  Products,
  ProductFilter,
  ProductSort,
  ProductCategory,
  useI18n,
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
import useQuery from 'lib/useQuery'
/* component */
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'

/* Style */
import styles from 'public/scss/pages/Products.module.scss'
import { ChevronDown } from 'react-feather'

const classesProductFilter = {
  filterVariantClassName: `${styles.filter_filterVariantName}`,
  filterNameClassName: `${styles.filter_filterName}`,
  filterOptionClassName: `${styles.filter_filterOption}`,
  filterColorInputClassName: styles.filter_filterColorInput,
  filterInputClassName: styles.filter_filterInput,
  filterColorLabelClassName: styles.filter_filterColorLabel,
  filterColorPreviewClassName: styles.filter_filterColorPreview,
  filterClassName: styles.filter_filterContainer,
  filterSliderClassName: styles.filter_filterSlider,
  filterSliderRailClassName: styles.filter_filterSliderRail,
  filterSliderHandleClassName: styles.filter_filterSliderHandle,
  filterSliderTooltipContainerClassName: styles.filter_filterSliderTooltipContainer,
  filterSliderTrackClassName: styles.filter_filterSliderTrack,
  filterPriceLabelClassName: styles.filter_filterPriceLabel,
  minPriceLabelClassName:styles.filter_minPriceLabel,
  maxPriceLabelClassName:styles.filter_maxPriceLabel,
  filterPriceInputClassName: styles.filter_filterPriceInput,
  filterPriceClassName: styles.filter_filterPriceClassName,
  filterSliderTooltipTextClassName: "products-menuCenterFilterSortFilterMenuPriceTooltipText",
  filtersClassName: "products-menuCenterFilterSortFilterContainer",
  filterCheckboxClassName: "products-menuCenterFilterSortFilterMenuCheckbox",
  filterLabelClassName: "products-menuCenterFilterSortFilterMenuCheckboxLabel",
  filterOptionPriceClassName: "products-menuCenterFilterSortFilterMenuPrice",
  filterSliderTooltipClassName: "products-menuCenterFilterSortFilterMenuPriceTooltip",
}

const classesProducts = {
  productContainerClassName: "products-product col-6 col-md-3 mb-2",
  productLabelContainerClassName: "products-product_content",
  productTitleClassName: "products-product_content--title text-truncate-2",
  productPriceClassName: "products-product_content--price",
  priceClassName: "products-product_content--price_disc",
  productImageContainerClassName: "products-product--image",
  productImageClassName: "w-100",

  salePriceClassName: "products-product_content--price_sale",
  stickerContainerClassName: "products-product_sticker",
  outOfStockLabelClassName: "products-product_sticker--outOfStock",
  saleLabelClassName: "products-product_sticker--sale",
  preOrderLabelClassName: "products-product_sticker--preOrder",
  newLabelClassName: "products-product_sticker--new",
  comingSoonLabelClassName: "products-sticker_bottom",
  openOrderLabelClassName: "products-sticker_bottom"
}

const classesProductSort = {
  sortClassName: "products-menuCenterFilterSortSort",
  sortOptionsClassName: styles.products_productsList,
  sortOptionButtonClassName: styles.products_productsButton,
  sortActiveClassName: "products-menuCenterFilterSortSortButton_active"
}

const classesProductCategory = {
  parentCategoryClassName: styles.category_categorParent,
  categoryValueClassName: styles.category_categoryValue,
  categoryNameClassName: styles.category_categoryName,
  childCategoryClassName: styles.category_categoryChild,
  categoryValueContainerClassName: styles.category_categoryValueContainer,
  selectedCategoryClassName: styles.category_categorySelectedCategory,
  dropdownIconClassName: styles.category_categoryDropdownIcon,
}

const classesPlaceholderSort = {
  placeholderList: styles.products_sortOption
}

const classesPlaceholderCategory = {
  placeholderList: "placeholder-item placeholder-item__product--card"
}

const classesPlaceholderFilter = {
  placeholderList: "placeholder-item placeholder-item__product--card"
}

const classesPlaceholderProducts = {
  placeholderImage: "placeholder-item placeholder-item__product--card"
}

const classesPaggination = {
  pagingClassName: 'pagination products-pagination col-12',
  activeClassName: 'active',
  itemClassName: 'page-item products-pagination_item',
  linkClassName: 'products-pagination_item--link btn',
}

const ProductsPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [sort, setSort] = useState(null)
  const [filterProduct, setFilterProduct] = useState({})
  const categories: string = useQuery('categories')
  const tagname: string = useQuery('tagname')
  const size = useWindowSize()
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 8,
    totalItems: 0,
    totalPages: 0
  })
  const [limitCategory,setLimitCategory] = useState(2)
  const [lengthCategory,setLengthCategory] = useState(0)
  const [showSeeMore, setShowSeeMore] = useState(false)

  const handleSeeMoreCategory = () => {
    setShowSeeMore(true)
    setLimitCategory(lengthCategory)
  }

  const handleSetLengthCategory = (data) => {
    setLengthCategory(data.length)
    if(data.length <= limitCategory) setShowSeeMore(false)
    else setShowSeeMore(true)
  }

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <div className={styles.products_container}>
        <div style={{width: "300px"}}>
          <p className={styles.filter_filterName}>
          {i18n.t('product.sort')}
          </p>
          <ProductSort
            classes={classesProductSort}
            handleSort={(selectedSort: any) => {
              setSort(selectedSort)
            }}
            loadingComponent={
              <Placeholder
                classes={classesPlaceholderSort}
                listMany={4}
                withList
              />
            }
          />
          <p className={styles.filter_filterName} style={{marginTop: "50px"}}>
            {i18n.t('blog.categories')}
          </p>
          <ProductCategory
            classes={classesProductCategory}
            categoryClassName="products-menuCenterFilterSortToggle"
            dropdownIcon={<ChevronDown/>}
            getData={handleSetLengthCategory}
            itemPerPage={limitCategory}
            loadingComponent={
              <Placeholder
                classes={classesPlaceholderSort}
                listMany={4}
                withList
              />
            }
          />
          {
            showSeeMore &&
            <div className={styles.category_categorySeeMore} onClick={handleSeeMoreCategory}>
              {i18n.t('product.seeAllCategory')}
            </div>
          }
          <ProductFilter
            sortType={"list"}
            withPriceMinimumSlider
            withPriceValueLabel
            withPriceInput
            withTooltip
            classes={classesProductFilter}
            handleFilter={(value: any) => setFilterProduct(value)}
            loadingComponent={
              <Placeholder
                classes={classesPlaceholderSort}
                listMany={4}
                withList
              />
            }
          />
        </div>

        {/* <div>//Container Products List
          <Products
            collectionSlug={categories || null}
            tagName={tagname}
            classes={classesProducts}
            getPageInfo={setPageInfo as any}
            sort={sort}
            pageNumber={pageInfo.pageNumber}
            itemPerPage={pageInfo.itemPerPage}
            callPagination={true}
            filter={filterProduct}
            paginationClasses={classesPaggination}
            nextLabel={">"}
            prevLabel={"<"}
            thumborSetting={{
              width: size.width < 768 ? 400 : 650,
              format: "webp",
              quality: 75,
            }}
            emptyStateComponent={
              <></>
            }
            loadingComponent={
              <>
                <div className="col-6 col-md-3 mb-5">
                  <Placeholder classes={classesPlaceholderProducts} withImage />
                </div>
                <div className="col-6 col-md-3 mb-5">
                  <Placeholder classes={classesPlaceholderProducts} withImage />
                </div>
                <div className="d-none d-md-block col-6 col-md-3 mb-5">
                  <Placeholder classes={classesPlaceholderProducts} withImage />
                </div>
                <div className="d-none d-md-block col-6 col-md-3 mb-5">
                  <Placeholder classes={classesPlaceholderProducts} withImage />
                </div>
              </>
            }
          />
        </div> */}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`);

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ""
    }
  };
};

export default ProductsPage;
