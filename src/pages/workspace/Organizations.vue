<template>
  <q-page>
    <q-card flat>
      <q-list>
        <q-item v-for="org in organizations" :key="org.Id"
          class="organization-item" v-ripple>
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

      <div class="fixed-bottom full-width">
        <q-btn :label="this.$t('buttons.submit')"
          :disable="!changed"
          @click="submit"
          color="blue-6"
          size="1rem"
          class="full-width"/>
      </div>
    </q-card>
  </q-page>
</template>

<script>
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
        }
      }
    }
  },
  methods: {
    submit: function () {
      const { Organization } = this.$FeathersVuex

      this.organizations.forEach(org => {
        let newOrg = new Organization({
          Id: org.Id,
          xStatus__c: org.xStatus__c
        })

        newOrg.save()
      })
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
.organization-item {
  border-bottom: 1px solid rgba(0,0,0,0.12);
}
</style>
