import { FC } from 'react'
import { Widget } from '@sirclo/nexus'
import Placeholder from 'components/Placeholder'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import styles from 'public/scss/components/WidgetHomePage.module.scss'
import useWindowSize from 'lib/useWindowSize'


const classesWidget = {
  widgetContainer: styles.widget_container,
  widgetItemTop: styles.widget_item_top,
};

const classesPlaceholderCollapsibleNav = {
  placeholderImage: `${classesWidget.widgetItemTop} ${styles.widget_placeholder}`,
};

const WidgetHomepageTop: FC<{}> = () => {
  const size = useWindowSize();
  return (
    <LazyLoadComponent>
      <Widget
        pos='main-content-1'
        containerClassName={classesWidget.widgetContainer}
        widgetClassName={classesWidget.widgetItemTop}
        loadingComponent={
          <div className={classesWidget.widgetContainer}>
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
          </div>
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
