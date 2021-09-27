/* library package */
import { FC, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { BlogSingle, BlogCategories, useI18n, BlogRecent, getBlogHeaderImage } from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Placeholder from 'components/Placeholder'
import SocialShare from 'components/SocialShare'
import { GRAPHQL_URI } from 'components/Constants';
/* styles */
import styles from 'public/scss/pages/Blog.module.scss'

const classesBlogSingle = {
  blogContainerClassName: styles.blog_container,
  headerClassName: styles.blog_detailHeader,
  headerContentClassName: styles.blog_detailHeaderContent,
  headerDetailClassName: styles.blog_detailMetaWrapper,
  headerEndClassName: 'd-none',
  authorPicContainerClassName: 'd-none',
  authorPicClassName: 'd-none',
  authorInfoClassName: 'd-none',
  createdByClassName: styles.blog_itemAuthor,
  createdByInnerClassName: `d-flex`,
  authorClassName: styles.blog_itemAuthor,
  dateClassName:
    'd-flex flex-row align-items-center justify-content-start order-1',
  blogContentClassName: styles.blog_detailContent,
};

const classesBlogCategories = {
  containerClassName: styles.blog_category,
  categoryClassName: styles.blog_categoryItem,
  linkClassName: styles.blog_categoryLink,
};

const classesPlaceholderBlogs = {
  placeholderImage: styles.blog_contentDetail,
};

const classesBlogRecent = {
  containerClassName: styles.blog_recent,
  blogRecentClassName: styles.blog_recentItem,
  imageClassName: styles.blog_recentItemImage,
  labelContainerClassName: styles.blog_recentItemContent,
  titleClassName: styles.blog_recentItemContentTitle,
  dateClassName: styles.blog_recentDate,
};

const BlogSlug: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
  urlSite,
  headerImage
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const [totalCategories, setTotalCategories] = useState(null)
  
  return (
    <Layout i18n={i18n} lng={lng} lngDict={lngDict} brand={brand}>
      <div className={styles.blog_parentDetail}>
        <div className={styles.blog_contentDetail}>
          <img className={styles.blog_headerImage} src={headerImage}/>
          <BlogSingle
            classes={classesBlogSingle}
            ID={slug.toString()}
            loadingComponent={
              <div>
                <Placeholder classes={classesPlaceholderBlogs} withImage />
              </div>
            }
          />
          <h5 className={styles.blog_titleShare}>
            {i18n.t('blog.share')}
          </h5>
          <SocialShare urlSite={urlSite} />
        </div>
        <div className={styles.blog_listCategoryDetail}>
          {(totalCategories > 0 || totalCategories === null) && (
            <>
              <h3 className={styles.blog_titleSide}>
                {i18n.t('blog.categoriesBlog')}
              </h3>
              <BlogCategories
                classes={classesBlogCategories}
                getCategoriesCount={(categoriesCount) =>
                  setTotalCategories(categoriesCount)
                }
              />
            </>
          )}

          <h3 className={styles.blog_titleSide}>{i18n.t('blog.otherArticle')}</h3>

          <BlogRecent
            classes={classesBlogRecent}
            limit={3}
            linkPrefix='blog'
            thumborSetting={{
              width: 100,
              format: 'webp',
              quality: 85,
            }}
            loadingComponent={
              <>
                <Placeholder classes={classesPlaceholderBlogs} withImage />
                <Placeholder classes={classesPlaceholderBlogs} withImage />
                <Placeholder classes={classesPlaceholderBlogs} withImage />
              </>
            }
          />

        <Link
          href='/[lng]/blog'
          as={`/${lng}/blog`}
        > 
          <h5>{i18n.t('blog.seeOther')}</h5>
        </Link>
        </div>

      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const { slug } = params;
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`)

  const brand = await useBrand(req)

  const urlSite = `https://${req.headers.host}/${params.lng}/blog/${slug}`
  const headerImage = await getBlogHeaderImage(GRAPHQL_URI(req));

  return {
    props: {
      lng: params.lng,
      lngDict,
      headerImage,
      slug: params.slug,
      brand: brand || '',
      urlSite: urlSite,
    },
  };
};

export default BlogSlug;
