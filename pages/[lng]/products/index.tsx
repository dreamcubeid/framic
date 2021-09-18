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
import ProductsComponent from 'components/ProductsComponent'

import styles from 'public/scss/pages/Products.module.scss'

const classesProductFilter = {
  filtersClassName: "products-menuCenterFilterSortFilterContainer",
  filterClassName: "products-menuCenterFilterSortFilterMenu",
  filterNameClassName: "products-menuCenterFilterSortFilterMenuTitle",
  filterCheckboxClassName: "products-menuCenterFilterSortFilterMenuCheckbox",
  filterLabelClassName: "products-menuCenterFilterSortFilterMenuCheckboxLabel",
  filterOptionPriceClassName: "products-menuCenterFilterSortFilterMenuPrice",
  filterPriceLabelClassName: "products-menuCenterFilterSortFilterMenuPriceLabel",
  filterPriceInputClassName: "products-menuCenterFilterSortFilterMenuPriceInput",
  filterSliderClassName: "products-menuCenterFilterSortFilterMenuPriceSlider",
  filterSliderRailClassName: "products-menuCenterFilterSortFilterMenuPriceRail",
  filterSliderHandleClassName: "products-menuCenterFilterSortFilterMenuPriceHandle",
  filterSliderTrackClassName: "products-menuCenterFilterSortFilterMenuPriceTrack",
  filterSliderTooltipClassName: "products-menuCenterFilterSortFilterMenuPriceTooltip",
  filterSliderTooltipContainerClassName: "products-menuCenterFilterSortFilterMenuPriceTooltipContainer",
  filterSliderTooltipTextClassName: "products-menuCenterFilterSortFilterMenuPriceTooltipText",
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
  sortOptionsClassName: "products-menuCenterFilterSortSortList",
  sortOptionButtonClassName: "products-menuCenterFilterSortSortButton",
  sortActiveClassName: "products-menuCenterFilterSortSortButton_active"
}

const classesProductCategory = {
  parentCategoryClassName: "products-menuCenterFilterSortCategoryParent",
  selectedCategoryClassName: "products-menuCenterFilterSortCategory_active",
  dropdownIconClassName: "d-none",
}

const classesPlaceholderSort = {
  placeholderList: "placeholder-item placeholder-item__product--card"
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

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <div className={styles.productsList_wrapper}> 
        {/* Container Products List */}
        <div className={styles.productsList_filterSort}> 
          {/* <ProductSort
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
          <ProductCategory
            classes={classesProductCategory}
            categoryClassName="products-menuCenterFilterSortToggle"
            withOpenedSubCategory
            loadingComponent={
              <Placeholder
                classes={classesPlaceholderCategory}
                listMany={4}
                withList
              />
            }
          />
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
                classes={classesPlaceholderFilter}
                listMany={4}
                withList
              />
            }
          /> */}
        </div>

        <div className={styles.productsList_list}>
          {/* Container Products List */}
          <ProductsComponent 
            i18n={i18n}
            lng={lng}
            tagName={tagname}
            itemPerPage={pageInfo.itemPerPage}
            type="list"
          />
          {/* <Products
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
          /> */}
        </div>
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
