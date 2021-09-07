import { FC } from "react";
import dynamic from "next/dynamic";
import {
  isCopyrightAllowed,
  Widget,
  SocialMediaIcons
} from "@sirclo/nexus";
import useWindowSize from "lib/useWindowSize";
import styles from "public/scss/components/Footer.module.scss";

const Placeholder = dynamic(() => import("components/Placeholder"));

const socialMediaIcons = {
  facebook: <img src="/images/facebook.svg" alt="facebook" />,
  twitter: <img src="/images/twitter.svg" alt="twitter" />,
  instagram: <img src="/images/instagram.svg" alt="instagram" />,
  // youtube: <img src="/images/youtube.svg" alt="youtube" />,
  // tiktok: <img src="/images/tiktok.svg" alt="tiktok" />
};

const classesMediaSocial = {
  socialMediaIconContainer: styles.footer_socialContainer,
  socialMediaIcon: styles.footer_socialItem,
}

const classesPlaceholderWidget = {
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_widgetFooterMenu}`,
}

const Footer: FC<any> = ({ brand }) => {
  const size: any = useWindowSize();
  const allowedCopyright = isCopyrightAllowed();

  return (
    <div className={styles.footer_wrapper}>
      <div className={styles.footer_container}>
        <Widget
          pos="footer-2"
          widgetClassName={styles.footer_logoDescription}
          // loadingComponent={
          //   <div className="row">
          //     <div className="col-12">
          //       <Placeholder
          //         classes={classesPlaceholderWidget}
          //         withList
          //         listMany={4}
          //       />
          //     </div>
          //   </div>
          // }
          thumborSetting={{
            width: size.width < 768 ? 576 : 1200,
            format: "webp",
            quality: 85
          }}
        />
        <SocialMediaIcons
          socialMediaIcons={socialMediaIcons}
          classes={classesMediaSocial}
        />
        <Widget
          pos="footer-1"
          widgetClassName={styles.footer_link}
          // loadingComponent={
          //   <div className="row">
          //     <div className="col-12">
          //       <Placeholder
          //         classes={classesPlaceholderWidget}
          //         withList
          //         listMany={4}
          //       />
          //     </div>
          //   </div>
          // }
          thumborSetting={{
            width: size.width < 768 ? 576 : 1200,
            format: "webp",
            quality: 85
          }}
        />
        <footer className={styles.footer_copyright}>
          {allowedCopyright ?
            <>
              {brand?.settings?.websiteTitle || ""}
              {(brand?.settings?.websiteTitle && allowedCopyright) && ` - `}
              POWERED BY&nbsp;<a href="https://store.sirclo.com" target="_blank">SIRCLO</a>
            </>
            :
            <Widget
              pos="copyright-and-policy"
              thumborSetting={{
                width: 1,
                format: 'webp',
                quality: 5,
              }}
            />
          }
        </footer>

      </div>
      {/* <div className={styles.widgetFooter}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">

              <hr className={styles.footer_line} />
              <SocialMediaIcons
                socialMediaIcons={socialMediaIcons}
                classes={classesMediaSocial}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Footer;