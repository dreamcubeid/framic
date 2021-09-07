import { FC } from 'react'
import { 
  Logo,
  CollapsibleNav,
  isCopyrightAllowed,
  Widget
} from '@sirclo/nexus'
import {
  ChevronDown,
  ChevronUp
} from 'react-feather'
import styles from 'public/scss/components/SideMenu.module.scss'

type SideMenuPropsType = {
  withClose?: boolean
  withTitle?: boolean,
  withLogo?: boolean,
  logo?: any,
  openSide: any,
  toogleSide: any,
  brand: any,
  size: any,
  positionSide: string
}

const classesCollapsibleNav = {
  parentNavClassName: styles.menu_parentNav,
  navValueClassName: styles.menu_navValue,
  navValueContainerClassName: styles.menu_navValueContainer,
  childNavClassName: styles.menu_navChildNav,
  subChildNavClassName: styles.menu_navChildNav,
};


const SideMenu: FC<SideMenuPropsType> = ({
  withClose = false,
  withLogo = false,
  size,
  openSide,
  toogleSide,
  brand,
  positionSide
}) => {
  const allowedCopyright = isCopyrightAllowed();

  return (
    <>
      <div className={`
        ${styles.sidemenu} 
        ${openSide ? `${styles[positionSide]}` : ""} 
      `}>
        <div className={styles.sidemenu_body}>
          <div className={styles.sidemenu_header}>
            {withLogo &&
              <Logo
                imageClassName={styles.sidemenu_logo}
                thumborSetting={{
                  width: size.width < 575 ? 200 : 400,
                  format: "webp",
                  quality: 90,
                }}
                lazyLoadedImage={false}
              />
            }
            {withClose &&
              <span className={styles.sidemenu_headerClose} />
            }
          </div>
          <CollapsibleNav
            dropdownIcon={<ChevronDown className={styles.icon_down_mobile__svg} />}
            dropdownOpenIcon={<ChevronUp className={styles.icon_down_mobile__svg} />}
            classes={classesCollapsibleNav}
          // loadingComponent={
          //   <>
          //     <Placeholder
          //       classes={classesPlaceholderCollapsibleNav}
          //       withList={true}
          //       listMany={4}
          //     />
          //   </>
          // }
          />
          <div className={styles.sidemenu_footer}>
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
          </div>
        </div>
      </div>
      <div className={styles.background} style={{ display: openSide ? 'block' : 'none' }} onClick={toogleSide}></div>
    </>
  )
}

export default SideMenu