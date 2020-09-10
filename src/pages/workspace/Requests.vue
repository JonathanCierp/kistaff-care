<template>
  <q-page>
    <q-card flat>
      <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="newjobs">
            <q-list>
              <request-item
                  v-for="request in newRequests"
                  :key="request.Id"
                  :request="request"
                  class="list-item"/>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="assignments">
            <q-list>
              <request-item
                  v-for="request in assignedRequests"
                  :key="request.Id"
                  :request="request"
                  class="request-item"/>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>

        <q-tabs dense
          v-model="tab"
          class="bg-primary text-white fixed-bottom full-width"
          align="justify"
          narrow-indicator>
          <q-tab name="newjobs"
            :label="this.$t('workspace.newjobs') + ' (' + newRequests.length +')'"></q-tab>
          <q-tab name="assignments"
            :label="this.$t('workspace.assignments')  + ' (' + assignedRequests.length +')'"></q-tab>
      </q-tabs>
    </q-card>
  </q-page>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'
import RequestItem from '../../components/workspace/RequestItem'

export default {
  name: 'Requests',
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
          xStatus__c: {
            $in: [
              'Requested',
              'Selected'
            ]
          },
          xIs_Available__c: true
        },
        paginate: false
      }
    },
    newRequests: function () {
      return this.requests.filter(function (x) {
        return x.xStatus__c === 'Requested' && x.upcoming
      })
    },
    assignedRequests: function () {
      return this.requests.filter(function (x) {
        return x.xStatus__c !== 'Requested' && x.upcoming
      })
    }
  },
  data () {
    return {
      tab: 'newjobs'
    }
  },
  mounted: function () {
    this.tab = this.$route.query.tab
  }
}
</script>

<style>
</style>
