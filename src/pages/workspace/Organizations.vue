<template>
  <q-page>
    <q-card flat>
      <div class="content-wrapper">
        <div class="main-content">
          <q-list>
            <q-item v-for="org in organizations" :key="org.Id"
              class="list-item" v-ripple>
              <q-item-section>
                <q-item-label>{{org.label}}</q-item-label>
              </q-item-section>
              <q-item-section side >
                <q-toggle v-model="org.xStatus__c"
                  @input="notifyToggle(org.xStatus__c)"
                  :color="org.color"
                  checked-icon="check"
                  unchecked-icon="clear"
                  false-value="Suspended"
                  true-value="Accepted"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="toolbar">
          <div class="q-pa-xs full-width">
            <q-btn :label="this.$t('buttons.save')"
              :disable="!changed"
              @click="saveRecords"
              color="primary"
              size="1rem"
              class="full-width"/>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import Vue from 'vue'
import { makeFindMixin } from 'feathers-vuex'

export default {
  name: 'Organizations',
  mixins: [
    makeFindMixin({ service: 'organizations' })
  ],
  computed: {
    organizationsParams () {
      return {
        query: {
          xStatus__c: {
            $in: [
              'Accepted',
              'Suspended'
            ]
          }
        },
        paginate: false
      }
    }
  },
  methods: {
    saveRecords: function () {
      this.$q.loading.show()

      const { Organization } = this.$FeathersVuex.api

      this.organizations.forEach(org => {
        let newOrg = new Organization({
          Id: org.Id,
          xStatus__c: org.xStatus__c
        })

        newOrg.save().catch(err => {
          Vue.config.errorHandler(err)
        })
      })

      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.changed = false
        this.timer = void 0
      }, 500)
    },
    notifyToggle: function (value) {
      this.changed = true
    }
  },
  data () {
    return {
      changed: false
    }
  }
}
</script>

<style>
</style>
