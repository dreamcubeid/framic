/* library package */
import { FC, useEffect, useState } from 'react'
import { Products } from '@sirclo/nexus'
/* library template */
import useInfiniteScroll from 'lib/useInfiniteScroll'
import useWindowSize from 'lib/useWindowSize'
import useQuery from 'lib/useQuery'
/* component */
import Placeholder from 'components/Placeholder'
/* styles */
import styles from 'public/scss/components/ProductList.module.scss'

export type ProductsListType = {
  i18n: any
  classProducts: any
  classPlaceholder: any
  collectionSlug: string
  filterProduct: any
  getTotalProduct: any
}

const ProductsList: FC<ProductsListType> = ({
  classProducts,
  classPlaceholder,
  i18n,
  getTotalProduct,
  filterProduct
}) => {
  const size = useWindowSize()
  const categories: string = useQuery("categories")
  const tagname: string = useQuery('tagname')

  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 6,
    totalItems: 0,
  })
  const totalPage = Math.ceil(pageInfo.totalItems / pageInfo.itemPerPage)
  const { currPage, setCurrPage } = useInfiniteScroll(pageInfo, 'products_list:last-child')

  const handleScroll = () => {
    const lastTestimonial = document.querySelector(
      ".product_container:last-child"
    ) as HTMLElement

    if (lastTestimonial) {
      const lastTestimonialOffset =
        lastTestimonial.offsetTop + lastTestimonial.clientHeight
      const pageOffset = window.pageYOffset + window.innerHeight
      if (pageOffset > lastTestimonialOffset) {
        if (currPage < totalPage - 1) {
          setCurrPage(currPage + 1)
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  const handlePageInfo = (data: any) => {
    setPageInfo(data)
    getTotalProduct(data?.totalItems)
  }

  return (
    <>
      {Array.from(Array(currPage + 1)).map((_, i) => (
        <Products
          key={i}
          pageNumber={i}
          itemPerPage={6}
          getPageInfo={(data: any) => handlePageInfo(data)}
          collectionSlug={categories}
          tagName={tagname}
          filter={filterProduct}
          withSeparatedVariant={true}
          fullPath={`product/{id}`}
          pathPrefix={`product`}
          lazyLoadedImage={false}
          classes={classProducts}
          thumborSetting={{
            width: size.width < 768 ? 400 : 600,
            quality: 85,
            format: 'webp'
          }}
          emptyStateComponent={
            <div className={styles.productList_emptyContainer}>
              <span className={styles.productList_emptyIcon} />
              <p className={styles.productList_emptyLabel}>{i18n.t("product.isEmpty")}</p>
            </div>
          }
          loadingComponent={
            <Placeholder classes={classPlaceholder} withList listMany={6} />
          }
        />
      ))}
    </>
  )
}

export default ProductsList