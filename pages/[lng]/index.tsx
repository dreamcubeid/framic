import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Banner, getBanner, useI18n } from '@sirclo/nexus'
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
import useWindowSize from 'lib/useWindowSize'
import { parseCookies } from 'lib/parseCookies'
import { useSizeBanner } from 'lib/useSizeBanner'
import { GRAPHQL_URI } from 'lib/Constants'
import Carousel from '@brainhubeu/react-carousel'
import { useBrand } from 'lib/useBrand'
import styles from 'public/scss/pages/Home.module.scss'
import WidgetHomepageTop from 'components/Widget/WidgetHomepageTop'
import WidgetHomepageBottom from 'components/Widget/WidgetHomepageBottom'
import Instagram from 'components/Instagram'

const classesBanner = {
  imageContainerClassName: styles.bannerCarousel_header,
  linkClassName: styles.bannerCarousel_link,
  imageClassName: styles.bannerCarousel_image,
};


const classesPlaceholderBanner = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem__banner}`,
};

const Home: FC<any> = ({
  lng,
  lngDict,
  brand,
  dataBanners,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const size = useWindowSize();

  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <section className={styles.homepage_container}>
        <div className={styles.bannerCarousel}>
          <Banner
            data={dataBanners?.data}
            Carousel={Carousel}
            classes={classesBanner}
            autoPlay={5000}
            infinite
            thumborSetting={{
              width: useSizeBanner(size.width),
              format: 'webp',
              quality: 85,
            }}
            loadingComponent={
              <Placeholder classes={classesPlaceholderBanner} withImage />
            }
            widthImage={size.width}
            lazyLoadedImage={false}
          />
        </div>
        <WidgetHomepageTop />
        <WidgetHomepageBottom/>
      </section>
      <Instagram size={size} i18n={i18n}/>
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
