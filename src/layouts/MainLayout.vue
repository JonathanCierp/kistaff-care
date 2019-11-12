<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>Kistaff</q-toolbar-title>

        <q-btn flat round dense icon="notifications" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          exact>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: this.$i18n.t('navigation.account'),
          to: '/profile',
          icon: 'settings'
        },
        {
          label: this.$i18n.t('navigation.requests'),
          to: '/requests',
          icon: 'assignment_late'
        },
        {
          label: this.$i18n.t('navigation.missions'),
          to: '/missions',
          icon: 'assignment_turned_in'
        },
        {
          label: this.$i18n.t('navigation.logout'),
          to: '/logout',
          icon: 'exit_to_app'
        }
      ]
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
