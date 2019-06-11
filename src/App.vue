<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { LocalStorage, Dialog } from 'quasar'
import { i18nInstance, setLocale } from 'boot/i18n'

export default {
  name: 'App',
  preFetch ({ store, redirect }) {
    setLocale(process.env.LOCALE)

    if (store.state.auth.user) {
      let version = LocalStorage.getItem('version')
      if (version) {
        console.log('Current version: ' + version)
        if (process.env.VERSION !== version) {
          console.log('New version available: ' + process.env.VERSION)
          Dialog.create({
            message: i18nInstance.t('messages.update_available'),
            ok: true
          }).onOk(() => {
            LocalStorage.set('version', process.env.VERSION)
            window.location.reload(true)
          })
        }
      } else {
        LocalStorage.set('version', process.env.VERSION)
      }
    }
  }
}
</script>

<style>
</style>
