
<template>
  <q-page>
    <q-card flat>
      <div class="content-wrapper">
        <div class="main-content">
          <q-card-section class="q-pa-sm">
            <div class="row">
              <div class="text-blue-grey-10 col">
                <span class="text-h7"><b>{{ request.label }}</b></span>
              </div>
            </div>
            <div class="row">
              <div class="text-grey col text-left">
                <q-icon name="event"
                  class="text-h7"/>
                <span class="text-h7">{{ request.fromDate }} </span>
              </div>
              <div class="text-grey col text-right">
                <q-icon name="timer"
                  class="text-h7"/>
                <span class="text-h7">{{ request.xService_Request__r.xDuration__c }}h</span>
              </div>
            </div>
          </q-card-section>

          <q-separator inset
            class="separator"/>

          <q-card-section class="q-pa-sm">
            <div class="row">
              {{request.message}}
            </div>
          </q-card-section>

          <q-separator inset
            class="separator"/>

          <q-card-section
            class="q-pa-sm"
            v-if="request.xService_Request__r.xAddress__c">
            <a :href="request.geoLink"
              class="text-blue-grey-14">
              <span>
                <b>{{ this.$t('workspace.mission_address') }}</b>{{request.xService_Request__r.xAddress__c}}
              </span>
              <img alt="Geo Location"
                :src="request.geoImage"
                class="image-map">
            </a>
          </q-card-section>
        </div>

        <div class="toolbar">
          <q-btn-group spread flat class="full-width q-pa-xs">
            <q-btn :label="this.$t('workspace.accept')"
              @click="accept"
              color="positive"
              class="q-pa-sm"/>
            <q-btn :label="this.$t('workspace.decline')"
              @click="decline"
              color="deep-orange"
              text-color="white"
              class="q-pa-sm"/>
          </q-btn-group>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import Vue from 'vue'
import { makeGetMixin } from 'feathers-vuex'
import ga from '../../components/analytics/ga'

export default {
  name: 'Request',
  mixins: [
    makeGetMixin({
      service: 'requests'
    })
  ],
  computed: {
    requestId () {
      return this.$route.params.id
    }
  },
  methods: {
    accept: function () {
      this.$q.loading.show()

      const { Request } = this.$FeathersVuex.api
      let req = new Request({ Id: this.request.Id })
      let tab = 'newjobs'

      if (this.request.xStatus__c === 'Requested') {
        req = Object.assign(req, {
          xResponse_Status__c: 'Accepted',
          xStatus__c: 'Submitted'
        })
      } else {
        tab = 'assignments'
        req = Object.assign(req, {
          xStatus__c: 'Confirmed'
        })
      }

      req.save().then(req => {
        this.$q.loading.hide()
        this.$router.push(`/requests?tab=${tab}`)

        ga.logEvent('requests', 'acceptEvent')
      }).catch(err => {
        Vue.config.errorHandler(err)
      })
    },
    decline: function () {
      this.$q.loading.show()

      const { Request } = this.$FeathersVuex.api
      let req = new Request({ id: this.request.Id })
      let tab = 'newjobs'

      if (this.request.xStatus__c === 'Requested') {
        req = Object.assign(req, {
          xResponse_Status__c: 'Declined',
          xStatus__c: 'Submitted'
        })
      } else {
        tab = 'assignments'
        req = Object.assign(req, {
          xStatus__c: 'Not Available'
        })
      }

      req.save().then(req => {
        this.$q.loading.hide()
        this.$router.push(`/requests?tab=${tab}`)

        ga.logEvent('requests', 'declineEvent')
      }).catch(err => {
        Vue.config.errorHandler(err)
      })
    }
  }
}
</script>

<style>
</style>
