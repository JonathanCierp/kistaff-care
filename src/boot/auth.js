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
            message: "Right on, let's do this!",
            type: 'info'
          })
        })
        .catch(err => {
          if (!quiet) {
            console.log(err)
            Vue.prototype.$q.notify({
              message: 'There was a problem logging you in.',
              type: 'error'
            })
          }
        })
    },
    logout (quiet) {
      return store.dispatch('auth/logout').then(() => {
        if (!quiet) {
          Vue.prototype.$q.notify({
            message: "You've been logged out.",
            type: 'info'
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
