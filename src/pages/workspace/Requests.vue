<template>
  <q-page>
    <q-list>
      <request-item
          v-for="request in requests"
          :key="request.Id"
          :request="request"
          class="request-item"/>
    </q-list>
  </q-page>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'
import RequestItem from '../../components/workspace/RequestItem'

export default {
  name: 'Posts',
  components: {
    'request-item': RequestItem
  },
  mixins: [
    makeFindMixin({ service: 'requests' })
  ],
  computed: {
    requestsParams () {
      return {
        query: {
        }
      }
    }
  }
}
</script>

<style>
  .request-item {
    max-width:800px;
    border-bottom: 1px solid rgba(0,0,0,0.12);
  }
</style>
