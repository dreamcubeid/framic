import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  BlogSingle,
  BlogCategories,
  useI18n,
  BlogRecent
} from "@sirclo/nexus";
import Layout from "components/Layout/Layout";
import { useBrand } from "lib/useBrand";
import styles from "public/scss/pages/Blog.module.scss";

const Placeholder = dynamic(() => import("components/Placeholder"));
const Popup = dynamic(() => import("components/Popup/Popup"));
const SocialShare = dynamic(() => import("components/SocialShare"));

const classesBlogSingle = {
  blogContainerClassName: styles.blog_container,
  headerClassName: styles.blog_detailHeader,
  headerContentClassName: styles.blog_detailHeaderContent,
  headerDetailClassName: styles.blog_detailMetaWrapper,
  headerEndClassName: "d-none",
  authorPicContainerClassName: "d-none",
  authorPicClassName: "d-none",
  authorInfoClassName: "d-none",
  createdByClassName: styles.blog_itemAuthor,
  createdByInnerClassName: `${styles.blog_detailMeta} d-flex flex-row align-items-center justify-content-start flex-wrap`,
  authorClassName: styles.blog_itemAuthor,
  dateClassName: "d-flex flex-row align-items-center justify-content-start order-1",
  blogContentClassName: styles.blog_detailContent
}

const classesBlogCategories = {
  containerClassName: styles.blog_category,
  categoryClassName: styles.blog_categoryItem,
  linkClassName: styles.blog_categoryLink,
}

const classesPlaceholderBlogs = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_blogsList}`
}

const classesBlogRecent = {
  containerClassName: styles.blog_recent,
  blogRecentClassName: `row ${styles.blog_recentItem}`,
  imageClassName: `col-4`,
  labelContainerClassName: `col-8`,
  titleClassName: styles.blog_recentItemContentTitle,
  dateClassName: styles.blog_itemAuthor
}

const BlogSlug: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
  urlSite
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const [totalCategories, setTotalCategories] = useState(null);
  const [showShare, setShowShare] = useState<boolean>(false);
  const toggleShare = () => setShowShare(!showShare);

  const router = useRouter();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
    <div className={styles.blog_parent}>
      <div className="row">
        <div className="col-sm-8">
            <BlogSingle
                classes={classesBlogSingle}
                ID={slug.toString()}
                loadingComponent={
                  <div className="row">
                    <div className="col-2">
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </div>
                    <div className="col-3">
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </div>
                    <div className="col-12 py-4">
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </div>
                  </div>
                }
              />

              <div className="d-none">
                <button onClick={() => router.back()}>
                  {i18n.t("global.back")}
                </button>
                <button onClick={() => toggleShare()} className={styles.blog_detailShare}>
                  {i18n.t("product.share")}
                </button>
              </div>
          </div>
          <div className="col-sm-4">
            {(totalCategories > 0 || totalCategories === null) &&
                  <>
                    <h2 className={styles.blog_titleSide}>
                      {i18n.t("blog.categories")}
                    </h2>
                    <BlogCategories
                      classes={classesBlogCategories}
                      getCategoriesCount={(categoriesCount) => setTotalCategories(categoriesCount)}
                    />
                  </>
                }

                <h2 className={styles.blog_titleSide}>
                  {i18n.t("blog.recentPost")}
                </h2>
                
                <BlogRecent
                  classes={classesBlogRecent}
                  limit={5}
                  linkPrefix="blog"
                  thumborSetting={{
                    width: 100,
                    format: "webp",
                    quality: 85
                  }}
                  loadingComponent={
                    <>
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </>
                  }
                />
          </div>
        </div>

        {showShare && (
          <Popup
            withHeader
            setPopup={toggleShare}
            mobileFull={false}
            classPopopBody
            popupTitle={i18n.t("product.shareProduct")}
          >
            <div className="">
              <SocialShare i18n={i18n} urlSite={urlSite} />
            </div>
          </Popup>
        )}

      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { slug } = params;
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  const urlSite = `https://${req.headers.host}/${params.lng}/blog/${slug}`;

  return {
    props: {
      lng: params.lng,
      lngDict,
      slug: params.slug,
      brand: brand || '',
      urlSite: urlSite
    },
  };
}

export default BlogSlug;
