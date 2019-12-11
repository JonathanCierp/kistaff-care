<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import { setLocale } from 'boot/i18n'

export default {
  name: 'App',
  preFetch ({ store, redirect }) {
    setLocale(process.env.LOCALE)
    LocalStorage.set('version', process.env.VERSION)
  }
}
</script>

<style>
</style>
