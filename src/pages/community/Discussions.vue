<template>
  <q-page padding>
    <div
      v-for="dis in discussions"
      :key="dis.id">
      <h6>{{dis.subject}}</h6>
    </div>
  </q-page>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

export default {
  name: 'Discussions',
  mixins: [
    makeFindMixin({ service: 'discussions' })
  ],
  computed: {
    discussionsParams () {
      return { query: {} }
    }
  }
}
</script>

<style>
</style>
