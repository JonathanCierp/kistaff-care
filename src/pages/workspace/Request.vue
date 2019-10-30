
<template>
  <q-page>
    <q-card flat
      class="request">
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

      <q-separator inset
        class="separator"/>

      <q-card-section class="q-pa-sm">
          <div class="row q-pt-sm">
            <div class="text-blue-grey-10 col">
              <span class="text-h8"><b>{{ request.title }}</b></span>
            </div>
          </div>
          <div class="float-right q-pt-sm">
            <q-btn :label="this.$t('workspace.accept')" @click="accept" color="green-4" class="q-mr-sm q-px-lg"/>
            <q-btn :label="this.$t('workspace.decline')" @click="decline" color="grey-4" text-color="black" class="q-mx-sm q-px-lg"/>

            <q-btn v-if="request.xStatus__c === 'Requested'"
              label="Jamais" @click="mute" color="red-4" text-color="white" class="q-ml-sm q-px-lg"/>
          </div>
      </q-card-section>
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
      const { Request } = this.$FeathersVuex
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
      const { Request } = this.$FeathersVuex
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
    },
    mute: function () {
      console.log('mute')
    }
  }
}
</script>

<style>
</style>
