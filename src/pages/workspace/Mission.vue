
<template>
  <q-page>
    <q-card flat
      class="mission">
      <q-card-section class="q-pa-sm">
        <div class="row">
          <div class="text-blue-grey-10 col">
            <span class="text-h7"><b>{{ mission.label }}</b></span>
          </div>
        </div>
        <div class="row">
          <div class="text-grey col text-left">
            <q-icon name="event"
              class="text-h7"/>
            <span class="text-h7">{{ mission.fromDate }} </span>
          </div>
          <div class="text-grey col text-right">
            <q-icon name="timer"
              class="text-h7"/>
            <span class="text-h7">{{ mission.xDuration__c }}h</span>
          </div>
        </div>
      </q-card-section>

      <q-separator inset
        class="separator"/>

      <q-card-section class="q-pa-sm">
        <div class="row">
          {{mission.message}}
        </div>
      </q-card-section>

      <q-separator inset
        class="separator"/>

      <q-card-section
        class="q-pa-sm"
        v-if="mission.xAddress__c">
        <a :href="mission.geoLink"
          class="text-blue-grey-14">
          <span>
            <b>{{ this.$t('workspace.mission_address') }}</b>{{mission.xAddress__c}}
          </span>
          <img alt="Geo Location"
            :src="mission.geoImage"
            class="image-map">
        </a>
      </q-card-section>

      <q-separator inset
        class="separator"/>

      <div class="fixed-bottom full-width q-pa-xs">
        <q-btn :label="this.$t('workspace.add_to_calendar')"
          @click="addToCalendar"
          color="blue-6"
          size="1rem"
          class="full-width"/>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { makeGetMixin } from 'feathers-vuex'
import { createEvent } from 'ics'

export default {
  name: 'mission',
  mixins: [
    makeGetMixin({
      service: 'missions'
    })
  ],
  computed: {
    missionId () {
      return this.$route.params.id
    }
  },
  methods: {
    addToCalendar: function () {
      console.log(this.mission.xICal_Event__c)
      let event = JSON.parse(this.mission.xICal_Event__c)
      createEvent(event, (error, value) => {
        if (error) {
          console.log(error)
        } else {
          let hiddenElement = document.createElement('a')
          hiddenElement.href = 'data:text/plain;charset=utf-8,' + encodeURI(value)
          hiddenElement.download = this.mission.Name + '_calendar.ics'
          hiddenElement.target = '_self'
          hiddenElement.click()
        }
      })
    }
  }
}
</script>

<style>
</style>
