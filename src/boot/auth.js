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
            message: Vue.prototype.$auth.i18n.t('notification.loginOK'),
            type: 'info'
          })
        })
        .catch(err => {
          if (!quiet) {
            console.log(err)
            Vue.prototype.$q.notify({
              message: Vue.prototype.$auth.i18n.t('notification.loginKO'),
              type: 'error'
            })
          }
        })
    },
    logout (quiet) {
      return store.dispatch('auth/logout').then(() => {
        if (!quiet) {
          Vue.prototype.$q.notify({
            message: Vue.prototype.$auth.i18n.t('notification.logoutOK'),
            type: 'info'
          })
        }
      })
    }
  }

  // Auth from JWT
  auth.i18n = app.i18n
  auth.login()

  // Add API to Vue
  Vue.prototype.$auth = auth
}
