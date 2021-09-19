/* library package */
import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { Products } from '@sirclo/nexus'
/* library template */
import useInfiniteScroll from 'lib/useInfiniteScroll';
import useWindowSize from 'lib/useWindowSize'
import useQuery from 'lib/useQuery';
/* component */
import Placeholder from 'components/Placeholder'

import styles from 'public/scss/components/ProductList.module.scss'

export type ProductsListType = {
  i18n: any
  classProducts: any
  classPlaceholder: any
  collectionSlug: string
  filterProduct: any
}
const ProductsList: FC<ProductsListType> = ({
  classProducts,
  classPlaceholder,
  i18n,
  filterProduct
}) => {
  const size = useWindowSize()
  const categories: string = useQuery("categories")
  const tagname: string = useQuery('tagname')
  const maxPrice: string = useQuery('0')
  const minPrice: string = useQuery('0')
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 8,
    totalItems: 0,
  })
  const { currPage, setCurrPage } = useInfiniteScroll(pageInfo, 'products_list:last-child')
  // const [filterProduct, setFilterProduct] = useState({
  //   maximumPrice: 0,
  //   minimumPrice: 0
  // })

  // useEffect(() => {
  //   setCurrPage(0);
  // }, [filterProduct, categories, tagName]);

  // useEffect(() => {
  //   setFilterProduct({
  //     maximumPrice: parseInt(maxPrice),
  //     minimumPrice: parseInt(minPrice)
  //   })
  // }, [maxPrice, minPrice]);

  return (
    <>
      {Array.from(Array(currPage + 1)).map((_, i) => (
        <Products
          key={i}
          pageNumber={i}
          itemPerPage={6}
          getPageInfo={setPageInfo as any}
          collectionSlug={categories}
          tagName={tagname}
          // sort={sort}
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