import { FC } from "react";
import { InstagramFeed } from "@sirclo/nexus";
import styles from "public/scss/components/Instagram.module.scss";


type TSize = {
  width: number
}

type iProps = {
  i18n: any
  size: TSize
}

const classesInstagramFeed = {
  containerClassName: styles.instagram_container,
  mediaClassName: styles.instagram_media,
  imageClassName: styles.instagram_image,
 }



const Instagram: FC<iProps> = ({ i18n, size }) => {
  return(
    <InstagramFeed
      //  Carousel={size.width < 768 ? false : Carousel}
       slidesPerPage={size.width < 768 ? false : 6}
       slidesPerScroll={size.width < 768 ? false : 1}
       autoPlay={3000}
       infinite
       postLimit={size.width < 768 ? 4 : 7}
       thumborSetting={{
         width: size.width < 768 ? 200 : 270,
         height: 250,
         quality: 75,
         format: 'webp'
       }}
       classes={classesInstagramFeed}
       loadingComponent={<> </>}
     />

  )
}

export default Instagram