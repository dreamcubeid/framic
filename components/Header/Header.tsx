import {
  FC,
  useState,
  useEffect
} from "react";
import { useRouter } from "next/router";
import {
  Logo,
  useCart,
  Widget,
  useI18n
} from "@sirclo/nexus";
import Router from "next/router";
import Placeholder from "../Placeholder";
import SideMenu from "../SideMenu/SideMenu";
import useWindowSize from "lib/useWindowSize";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { X } from 'react-feather';
import styles from "public/scss/components/Header.module.scss";

const classesPlaceholderLogo = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_header__logo}`
}

const classesPlaceholderWidget = {
  placeholderTitle: `${styles.placeholderItem} ${styles.placeholderItem_header__widget}`
}

const Header: FC<any> = ({ lng, brand }) => {
  const i18n: any = useI18n();
  const { data: dataCart } = useCart();
  const router = useRouter();
  const size: any = useWindowSize();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [showAnnounce, setShowAnnounce] = useState<boolean>(true);
  const [countWidgetAnnouncement, setCountWidgetAnnouncement] = useState(null);

  useEffect(() => {
    setOpenMenu(false);
  }, [router.query]);

  const toogleMenu = () => setOpenMenu(!openMenu);

  const handleCart = () => {
    if (router.pathname !== "/[lng]/payment_notif/[[...orderID]]") Router.push("/[lng]/cart",`/${lng}/cart`);
  }

  return (
    <>
      {(countWidgetAnnouncement === null || countWidgetAnnouncement > 0) &&
        <div className={styles.announce} style={{ display: showAnnounce ? 'flex' : 'none' }}>
          <span className={styles.announce__close}>
            <X
              className={styles.announce__close__icon}
              onClick={() => setShowAnnounce(false)}
            />
          </span>
          <Widget
            getItemCount={(itemCount: number) => setCountWidgetAnnouncement(itemCount)}
            pos="header-announcements"
            widgetClassName={styles.announce__items}
            loadingComponent={<Placeholder classes={classesPlaceholderWidget} withTitle />}
          />
        </div>
      }
      <header className={`${styles.header}`}>
        <span className={styles.header_menu} onClick={toogleMenu} />
        <div className={styles.header_logoContainer}>
          <LazyLoadComponent
            placeholder={
              <Placeholder classes={classesPlaceholderLogo} withImage={true} />
            }
          >
            <Logo
              imageClassName={styles.header_logo}
              thumborSetting={{
                width: size.width < 575 ? 200 : 400,
                quality: 90
              }}
              lazyLoadedImage={false}
            />
          </LazyLoadComponent>
        </div>
        <div 
          className={styles.header_cartContainer}
          onClick={handleCart}
        >
          <span className={styles.header_cartIcon}/>
          <label className={styles.header_cartLabel}>{dataCart?.totalItem}</label>
        </div>

        {openMenu &&
          <SideMenu
            i18n={i18n}
            lng={lng}
            openSide={openMenu}
            toogleSide={toogleMenu}
            positionSide="left"
            withLogo
            size={size}
            brand={brand}
            withClose
          />
        }
      </header>
    </>
  );
};

export default Header;