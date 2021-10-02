import { FC } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { useI18n, Contact, Widget, isEnquiryAllowed } from '@sirclo/nexus';
import Layout from 'components/Layout/Layout';
import { useBrand } from 'lib/useBrand';
import { toast } from 'react-toastify';

import styles from 'public/scss/pages/Contact.module.scss';
import stylesButton from 'public/scss/components/Button.module.scss';
import stylesForm from 'public/scss/components/Form.module.scss';

const Placeholder = dynamic(() => import('components/Placeholder'));

const classesContact = {
  mapClassName: styles.contact_map,
  titleClassName: styles.contact_content,
  inputClassName: stylesForm.form_inputLong,
  labelClassName: styles.contact_label,
  buttonContainerClassName: styles.contact_buttonContainer,
  buttonClassName: `${stylesButton.btn_primaryLong}`,
  widgetClassName: styles.contact_widget,
};

const classesPlaceholderContact = {
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_contactWidget}`,
};

const ContactPage: FC<any> = ({
  lng,
  lngDict,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const allowedEnquiry = isEnquiryAllowed();

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      withAllowed={allowedEnquiry}
    >
      <div className={styles.contact_container}>
        <div className={styles.contact_form}>
          <h4>{i18n.t('contact.title')}</h4>
          <Contact
            classes={classesContact}
            isAddressDetail={false}
            onCompleted={() => toast.success(i18n.t('contact.submitSuccess'))}
            onError={() => toast.error(i18n.t('contact.submitError'))}
            widget={
              <Widget
                pos='footer-4'
                widgetClassName={styles.contact_info}
                loadingComponent={
                  <Placeholder
                    classes={classesPlaceholderContact}
                    withList
                    listMany={5}
                  />
                }
              />
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { default: lngDict = {} } = await import(`locales/${params.lng}.json`);

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      brand: brand || '',
    },
  };
};

export default ContactPage;
