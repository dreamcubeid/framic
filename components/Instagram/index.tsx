import { FC } from 'react'
import { InstagramFeed } from '@sirclo/nexus'
import styles from 'public/scss/components/Instagram.module.scss'
import Placeholder from 'components/Placeholder'

type TSize = {
  width: number;
};

type iProps = {
  size: TSize;
};

const classesInstagramFeed = {
  containerClassName: styles.instagram_container,
  mediaClassName: styles.instagram_media,
  imageClassName: styles.instagram_image,
  ctaClassName: styles.instagram_cta,
  layoutClassName: styles.instagram_layout,
  iconClassname: styles.instagram_icon
};

const classesPlaceholderCollapsibleNav = {
  placeholderImage: `${classesInstagramFeed.mediaClassName} ${classesInstagramFeed.imageClassName}`,
};

const Instagram: FC<iProps> = ({ size }) => {
  const postLimit = size.width < 768 ? 4 : 7;
  return (
    <div className={classesInstagramFeed.layoutClassName}>
      <InstagramFeed
        slidesPerPage={size.width < 768 ? false : 6}
        slidesPerScroll={size.width < 768 ? false : 1}
        autoPlay={3000}
        infinite
        postLimit={postLimit}
        thumborSetting={{
          width: size.width < 768 ? 200 : 270,
          height: 250,
          quality: 75,
          format: 'webp',
        }}
        classes={classesInstagramFeed}
        loadingComponent={
          <div className={classesInstagramFeed.containerClassName}>
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            {postLimit === 7 && (
              <>
                <Placeholder
                  classes={classesPlaceholderCollapsibleNav}
                  withImage
                />
                <Placeholder
                  classes={classesPlaceholderCollapsibleNav}
                  withImage
                />
                <Placeholder
                  classes={classesPlaceholderCollapsibleNav}
                  withImage
                />
              </>
            )}
          </div>
        }
      />
      <div className={classesInstagramFeed.containerClassName}>
        <div className={classesInstagramFeed.ctaClassName}>
          <img src="/images/instagram_black.svg" alt="instagram" className={classesInstagramFeed.iconClassname}/>
          <p>Follow us</p>
        </div>
      </div>
    </div>
  );
};

export default Instagram;
