export default ({ app, router, store, Vue }) => {
  console.log(store.state.auth)
  const auth = {
    currentUser (prop) {
      let u = store.state.auth.user || false
      if (u && prop) return u[prop]
      return u
    },
    login (payload, quiet) {
      return store.dispatch('auth/authenticate', payload)
        .then(() => {
          router.push('/profile')

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

  // Auth from JWT stored in browser before loading the app.
  auth.login('jwt', true)

  // Add API to Vue
  Vue.prototype.$auth = auth
}
