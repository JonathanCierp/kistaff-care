import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../lib/feathersClient'

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

export default new Vuex.Store({
  plugins: [
    // Users Service
    service('users', {
      instanceDefaults: {
        email: '',
        password: ''
      }
    }),

    // Auth Service
    auth({ userService: 'users' }),

    // Posts Service
    service('posts', {
      instanceDefaults: {}
    }),

    // Discussions Service
    service('discussions', {
      instanceDefaults: {},
      debug: true
    })
  ]
})
