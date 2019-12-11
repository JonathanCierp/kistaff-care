export default ({ app, router, store, Vue }) => {
  Vue.config.errorHandler = function (err, vm, info) {
    Vue.prototype.$q.notify({
      message: err.message,
      textColor: 'white',
      color: 'negative',
      icon: 'error_outline'
    })
  }
}
