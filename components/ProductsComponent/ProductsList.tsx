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

import styles from 'public/scss/components/WidgetHomePage.module.scss'

export type ProductsListType = {
  //   i18n: any
  //   lng: any
  classProducts: any
  //   classPlaceholder: any
  tagName?: string
  //   itemPerPage: number
  //   setTotalProducts: (total: number) => void
}
const ProductsList: FC<ProductsListType> = ({
  tagName,
  classProducts
}) => {
  const size = useWindowSize()
  const categories: string = useQuery("categories")
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    itemPerPage: 8,
    totalItems: 0,
  })
  const { currPage, setCurrPage } = useInfiniteScroll(pageInfo, 'products_list:last-child')
  const [filterProduct, setFilterProduct] = useState({
    maximumPrice: 0,
    minimumPrice: 0
  })

  useEffect(() => {
    setCurrPage(0);
  }, [filterProduct, categories, tagName]);

  return (
    <>
      {Array.from(Array(currPage + 1)).map((_, i) => (
        <Products
          key={i}
          pageNumber={i}
          itemPerPage={6}
          tagName={tagName}
          collectionSlug={categories}
          getPageInfo={setPageInfo as any}
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
            <></>
          }
          loadingComponent={
            <>

            </>
          }
        />
      ))}
    </>
  )
}

export default ProductsList