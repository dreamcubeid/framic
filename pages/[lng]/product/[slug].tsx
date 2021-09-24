import {
  FC,
  useState,
  useEffect
} from "react";
import {
  useI18n,
  getProductDetail
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import { GRAPHQL_URI } from "components/Constants";
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import { useBrand } from "lib/useBrand";
import ProductDetailComponent from "components/ProductDetailComponent";


const Product: FC<any> = ({
  lng,
  lngDict,
  slug,
  data,
  brand,
  urlSite
}) => {
  const i18n: any = useI18n();
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    if (showCart) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showCart]);

  const linksBreadcrumb = [`${i18n.t("header.home")}`, data?.details[0]?.name || ""]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div>
        <ProductDetailComponent 
          slug={slug} 
          data={data}
          urlSite={urlSite}
        />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req, params }) {
  const { slug } = params;
  const data = await getProductDetail(GRAPHQL_URI(req), slug);
  const brand = await useBrand(req);

  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`);

  const urlSite = `https://${req.headers.host}/${params.lng}/product/${slug}`;

  return {
    props: {
      lng: params.lng,
      slug,
      lngDict,
      data: data || null,
      brand: brand || "",
      urlSite: urlSite,
    },
  };
}

export default Product;
