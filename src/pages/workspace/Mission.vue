
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
        <b>{{ this.$t('workspace.mission_address') }} </b>{{mission.xAddress__c}}
      </q-card-section>

      <q-separator inset
        class="separator"/>

      <q-card-section class="q-pa-sm fixed-bottom"
        v-if="mission.upcoming">
          <div class="float-right q-pt-sm">
            <q-btn :label="this.$t('workspace.add_to_calendar')"
              @click="addToCalendar"
              color="green-4"
              class="full-width"/>
          </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { makeGetMixin } from 'feathers-vuex'

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
      console.log('Add to calendar')
    }
  }
}
</script>

<style>
</style>
