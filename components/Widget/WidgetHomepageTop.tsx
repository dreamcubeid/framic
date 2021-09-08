import { FC } from 'react'
import { Widget } from '@sirclo/nexus'
import Placeholder from 'components/Placeholder'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import styles from 'public/scss/components/WidgetHomePage.module.scss'
import useWindowSize from 'lib/useWindowSize'

type iProps = {
  i18n: any;
};

const classesWidget = {
  widgetContainer: styles.widget_container,
  widgetItem: styles.widget_item,
};

const classesPlaceholderProduct = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_product__card}`,
};

const WidgetHomepageTop: FC<iProps> = ({ i18n }) => {
  const size = useWindowSize();
  return (
    <LazyLoadComponent>
      <Widget
        pos='main-content-1'
        containerClassName={classesWidget.widgetContainer}
        widgetClassName={classesWidget.widgetItem}
        loadingComponent={
          <>
            <div className='col-6'>
              <Placeholder classes={classesPlaceholderProduct} withImage />
            </div>
            <div className='col-6'>
              <Placeholder classes={classesPlaceholderProduct} withImage />
            </div>
          </>
        }
        thumborSetting={{
          width: size.width < 768 ? 576 : 1200,
          format: 'webp',
          quality: 85,
        }}
      />
    </LazyLoadComponent>
  );
};

export default WidgetHomepageTop;
