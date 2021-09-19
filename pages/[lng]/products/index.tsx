/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useI18n } from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
import useWindowSize from 'lib/useWindowSize'
/* component */
import Layout from 'components/Layout/Layout'
import ProductsComponent from 'components/ProductsComponent'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Router from 'next/router'

/* Style */
import styles from 'public/scss/pages/Products.module.scss'
import ProductFilterSort from 'components/ProductFilterSort'

const ProductsPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const size = useWindowSize()
  const { query } = useRouter()
  const [openFilterSort, setOpenFilterSort] = useState<boolean>(false)
  const [filterProduct, setFilterProduct] = useState({})

  const linksBreadcrumb = [`${i18n.t("header.home")}`, i18n.t("product.all")]

  const handleFilter = (selectedFilter: any) => setFilterProduct(selectedFilter)
  const handeClear = () => Router.replace(`/${lng}/products`)
  const handleOpenSortFilter = () => setOpenFilterSort(!openFilterSort)

  const generateTotalProducts = (total: string = '0') => {
    const label = i18n.t('product.showingProduct');
    return label.replace('{TOTAL}', total);
  };

  const handleCekQuery = () => {
    const { lng, ...allquery } = query
    return JSON.stringify(allquery) === "{}" ? false : true;
  }


  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.products_container}>
        {(size.width > 767 || openFilterSort) &&
          <div className={styles.products_filterSort}>
            {/* Container Products Filter */}
            <ProductFilterSort
              i18n={i18n}
              handleOpenSortFilter={handleOpenSortFilter}
              handleFilter={handleFilter}
            />
          </div>
        }

        <div className={styles.products_listWrapper}>
          <div className={styles.products_listHeaderContainer}>
            <div className={styles.products_listAdjustContainer}>
              <h3 className={styles.products_listHeaderTitle}>
                {i18n.t('product.all')}
              </h3>
              <label
                className={styles.products_listAdjustTitle}
                onClick={handleOpenSortFilter}
              >
                <span className={styles.products_listAdjustIcon} />
                {i18n.t('product.adjust')}
              </label>
            </div>
            {handleCekQuery() &&
              <div className={styles.products_listClearContainer}>
                <label className={styles.products_listHeaderTotal}>
                  {generateTotalProducts('2')}
                </label>
                <button
                  className={styles.products_listClearButton}
                  onClick={handeClear}
                >{i18n.t('product.clear')}</button>
              </div>
            }
          </div>
          <div className={styles.products_list}>
            {/* Container Products List */}
            <ProductsComponent
              i18n={i18n}
              lng={lng}
              filterProduct={filterProduct}
              type="list"
            />
          </div>
          <div className={styles.products_backTopContainer}>
            <a href="#top" className={styles.products_backTopLink} aria-label="Scroll to Top" />
          </div>
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
