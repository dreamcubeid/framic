/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  Calendar,
  CheckCircle
} from 'react-feather'
import {
  Register,
  useI18n,
  SingleSignOn
} from '@sirclo/nexus'
/* library template */
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
import { useGoogleAuth } from 'lib/useGoogleAuth'
import { useFacebookAuth } from 'lib/useFacebookAuth'
/* component */
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Register.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'

const classesRegister = {
  headerLabelClassName: styles.register_headerLabel,
  inputContainerClassName: stylesForm.form_control,
  buttonClassName: stylesButton.btn_primaryLong,
  verificationContainerClassName: styles.register_verificationContainer,
  labelRequiredClassName: stylesForm.form_label,
  // inputClassName: `form-control ${styles.sirclo_form_input}`,
  // basicInfoContainerClassName: "d-block m-0 p-0",
  // containerClassName: `${styles.login_item} ${styles.login_item__form} order-3`,
  // deliveryAddressContainerClassName: "col-12",
  // datePickerInputClassName: "date-picker__input",
  // datePickerCalendarClassName: "date-picker__calendar",
  // passwordStrengthBarClassName: styles.passwordBar,
  // passwordStrengthBarContainerClassName: styles.passwordValidation,
  // passwordCriteriaListClassName: `${styles.formPassword} d-none`,
  // passwordCriteriaClassName: styles.formPasswordList,
}

const RegisterPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  const [isVerified, setIsVerified] = useState<boolean>(false)
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("register.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.register_wrapper}>
        <div className={styles.register_container}>
          <h3 className={styles.register_title}>{i18n.t("register.title")}</h3>
          <Register
            classes={classesRegister}
            withHeaderLabel={true}
            onErrorMsg={(msg) => toast.error(msg)}
            onSuccessMsg={(msg) => toast.success(msg)}
            redirectPage={() => Router.push(`/[lng]/login`, `/${lng}/login`)}
            passwordViewIcon={<span className={styles.register_viewIcon} />}
            passwordHideIcon={<span className={styles.register_hideIcon} />}
            passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
            passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
            datePickerCalendarIcon={<Calendar />}
            withVerification={true}
            isVerified={isVerified}
            loadingComponent={<Loader color="text-light" />}
            verificationComponent={
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                onChange={() => setIsVerified(true)}
              />
            }
          />

          {(hasGoogleAuth || hasFacebookAuth) &&
            <div className={styles.login_otherLoginContainer}>
              <label className={styles.login_or}>{i18n.t("login.or")}</label>
              <SingleSignOn
                className="login_sso"
                buttonText={i18n.t("login.sso")}
                onErrorMsg={(msg: string) => toast.error(msg)}
                loadingComponent={<></>}
              />
            </div>
          }
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  )

  const brand = await useBrand(req)

  const cookies = parseCookies(req)
  const hasGoogleAuth = await useGoogleAuth(req)
  const hasFacebookAuth = await useFacebookAuth(req)
  redirectIfAuthenticated(res, cookies, 'account')

  return {
    props: {
      lng: params.lng,
      lngDict,
      hasGoogleAuth,
      hasFacebookAuth,
      brand: brand || ""
    }
  }
}

export default RegisterPage
