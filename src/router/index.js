import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    let authorized = true

    to.matched.some((record) => {
      let loggedUser = store.state.auth.user

      if ('meta' in record) {
        if ('auth' in record.meta) {
          if (record.meta.auth) {
            if (!loggedUser) {
              authorized = false
              next('login')
            }
          }
        }
      }
    })

    if (authorized) {
      next()
    }
  })

  return Router
}
