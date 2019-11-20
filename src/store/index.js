// src/store/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { FeathersVuex } from '../lib/feathersClient'
import auth from './store.auth'

Vue.use(Vuex)
Vue.use(FeathersVuex)

const requireModule = require.context(
  './services',
  false,
  /.js$/
)
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  plugins: [...servicePlugins, auth]
})
