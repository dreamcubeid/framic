/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { parseCookies } from 'lib/parseCookies'
import { useI18n } from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* components */
import CartDetailsComponent from 'components/CartDetails'
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Cart.module.scss'

const Cart: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("cart.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.cart_container}>
        <h3 className={styles.cart_title}>{i18n.t("cart.title")}</h3>

        <div className={styles.cart_detailsContainer}>
          <CartDetailsComponent lng={lng} />
        </div>

        <div className={styles.cart_orderSummaryContainer}>
          //orderSummary Component
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  if (process.env.IS_PROD !== "false") {
    const cookies = parseCookies(req)
    res.writeHead(307, {
      Location: `/${cookies.ACTIVE_LNG || "id"}`,
    });
    res.end()
  }

  const brand = await useBrand(req)

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || ''
    }
  }
}

export default Cart