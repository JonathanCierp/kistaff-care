import { i18nInstance } from './i18n'

/* eslint-disable no-console */
export default ({ app, router, store, Vue }) => {
  const auth = {
    currentUser (prop) {
      let u = store.state.auth.user || false
      if (u && prop) return u[prop]
      return u
    },
    login (payload, quiet) {
      return store.dispatch('auth/authenticate', payload)
        .then(() => {
          router.push('/home')

          Vue.prototype.$q.notify({
            message: i18nInstance.t('notification.loginOK')
          })
        })
        .catch(err => {
          if (!quiet) {
            console.log(err)
            Vue.prototype.$q.notify({
              message: i18nInstance.t('notification.loginKO')
            })
          }
        })
    },
    logout (quiet) {
      return store.dispatch('auth/logout').then(() => {
        if (!quiet) {
          Vue.prototype.$q.notify({
            message: i18nInstance.t('notification.logoutOK')
          })
        }
      })
    }
  }

  // Auth from JWT
  auth.login()

  // Add API to Vue
  Vue.prototype.$auth = auth
}
