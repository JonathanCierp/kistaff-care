<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container style="background: url(/statics/images/background.png)">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'GuestLayout',
  data () {
    return { }
  },
  methods: {
    openURL
  }
}
</script>

<style>
.login-card {
  border-radius: 5px !important;
  opacity: 0.85;
}

.login-card .app-logo {
  height: 80px;
}
</style>
