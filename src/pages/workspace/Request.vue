
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
            <b>Lieu de la mission: </b>{{request.xService_Request__r.xAddress__c}}
          </span>
          <img alt="Geo Location"
            :src="request.geoImage"
            class="image-map">
        </a>
      </q-card-section>

      <q-separator inset
        class="separator"/>

      <q-card-section class="q-pa-sm">
          <div class="row">
            <div class="text-blue-grey-10 col">
              <span class="text-h8"><b>{{ request.title }}</b></span>
            </div>
          </div>
          <div class="float-right">
            <q-btn label="Oui" type="submit" color="primary"/>
            <q-btn label="Non" type="reset" color="primary" flat class="q-ml-sm" />
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
  }
}
</script>

<style>
.request {

}
</style>
