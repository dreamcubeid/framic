import { FC, useEffect, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getBanner, useI18n } from '@sirclo/nexus'
import Layout from 'components/Layout/Layout'
import { parseCookies } from 'lib/parseCookies'
import { GRAPHQL_URI } from 'lib/Constants'
import { useBrand } from 'lib/useBrand'
import WidgetHomepageTop from 'components/Widget/WidgetHomepageTop'
import WidgetHomepageBottom from 'components/Widget/WidgetHomepageBottom'
import BannerComponent from 'components/BannerComponent'

import styles from 'public/scss/pages/Home.module.scss'

const Home: FC<any> = ({
  lng,
  lngDict,
  brand,
  dataBanners,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!isReady) setIsReady(true);
  }, [isReady]);

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <section className={styles.homepage_container}>
        <BannerComponent
          dataBanners={dataBanners?.data}
          isReady={isReady}
        />  
        <WidgetHomepageTop />
        <WidgetHomepageBottom />
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}: any) => {
  const allowedUri: Array<string> = ['en', 'id', 'graphql', 'favicon.ico'];

  if (allowedUri.indexOf(params.lng.toString()) == -1) {
    const cookies = parseCookies(req);

    res.writeHead(307, {
      Location: cookies.ACTIVE_LNG
        ? '/' + cookies.ACTIVE_LNG + '/' + params.lng
        : '/id/' + params.lng,
    });

    res.end();
  }

  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`);

  const brand = await useBrand(req);
  const dataBanners = await getBanner(GRAPHQL_URI(req));

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
      dataBanners,
    },
  };
};

export default Home;
