
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
              color="light-green"
              class="q-pa-sm"/>
            <q-btn :label="this.$t('workspace.decline')"
              @click="decline"
              color="amber-10"
              text-color="white"
              class="q-pa-sm"/>
          </q-btn-group>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { makeGetMixin } from 'feathers-vuex'

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
      const { Request } = this.$FeathersVuex.api
      let req = new Request({
        Id: this.request.Id,
        xService_Staff__c: this.request.xService_Staff__c
      })

      if (this.request.xStatus__c === 'Requested') {
        req = Object.assign(req, {
          xResponse_Status__c: 'Accepted',
          xStatus__c: 'Submitted'
        })
      } else {
        req = Object.assign(req, {
          xStatus__c: 'Confirmed'
        })
      }

      req.save().then(req => {
        this.$router.push('/requests')
      })
    },
    decline: function () {
      const { Request } = this.$FeathersVuex.api
      let req = new Request({ id: this.request.Id })

      if (this.request.xStatus__c === 'Requested') {
        req = Object.assign(req, {
          xResponse_Status__c: 'Declined',
          xStatus__c: 'Submitted'
        })
      } else {
        req = Object.assign(req, {
          xStatus__c: 'Not Available'
        })
      }

      req.save().then(req => {
        this.$router.push('/requests')
      })
    }
  }
}
</script>

<style>
</style>
