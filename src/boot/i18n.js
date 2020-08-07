import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import { Quasar } from 'quasar'

Vue.use(VueI18n)
const i18nInstance = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'en-us',
  messages
})

export default ({ app }) => {
  app.i18n = i18nInstance
}

export { i18nInstance }

export const setLocale = (locale) => {
  i18nInstance.locale = locale
  let langModule = `quasar/lang/${locale}`

  import(langModule).then(lang => {
    Quasar.lang.set(lang.default)
  })
}
