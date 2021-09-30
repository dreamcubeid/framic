/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from 'react-toastify'
import {
  Login,
  SingleSignOn,
  useI18n
} from '@sirclo/nexus'
/* library template */
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
import { useGoogleAuth } from 'lib/useGoogleAuth'
import { useFacebookAuth } from 'lib/useFacebookAuth'
/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Login.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

const loginClasses = {
  containerClassName: styles.login_formContainer,
  inputContainerClassName: stylesForm.form_control,
  inputClassName: stylesForm.form_inputLong,
  buttonClassName: stylesButton.btn_primaryLong,
  footerClassName: styles.login_footer,
  forgotPasswordClass: styles.login_forgotPassword,
}

const LoginPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("login.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.login_wrapper}>
        <div className={styles.login_container}>
          <h3 className={styles.login_title}>{i18n.t("login.title")}</h3>
          <Login
            classes={loginClasses}
            onCompletedMsg={(msg: string) => toast.success(msg)}
            onErrorMsg={(msg: string) => toast.error(msg)}
            passwordViewIcon={<span className={styles.login_viewIcon} />}
            passwordHideIcon={<span className={styles.login_hideIcon} />}
            loadingComponent={
              <p>{i18n.t("global.loading")}</p>
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

export default LoginPage