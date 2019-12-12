<template>
  <q-page>
    <q-card flat>
      <div class="content-wrapper">
        <div class="main-content">
          <q-card-section>
            <q-input id="fromDate"
              :label="this.$t('labels.leave_from_date')"
              :error="this.$v.fromDate.$error"
              v-model="fromDate"
              :rules="['date']"
              mask="date"
              required>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="fromDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="fromDate" @input="hideFromDate" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input id="toDate"
              :label="this.$t('labels.leave_to_date')"
              :error="this.$v.toDate.$error"
              v-model="toDate"
              :rules="['date']"
              mask="date"
              required>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="toDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="toDate" @input="hideToDate" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

          </q-card-section>
        </div>
        <div class="toolbar q-pa-xs">
          <q-btn
            class="full-width"
            color="primary"
            @click="submitLeave">
            {{ $t('buttons.submit') }}
          </q-btn>
        </div>
       </div>
    </q-card>
  </q-page>
</template>

<script>
import Vue from 'vue'
import { date } from 'quasar'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Leave',
  data () {
    return {
      fromDate: '',
      toDate: ''
    }
  },
  methods: {
    submitLeave () {
      this.$v.fromDate.$touch()
      this.$v.toDate.$touch()

      if (!this.$v.fromDate.$error &&
          !this.$v.toDate.$error) {
        this.$q.loading.show()

        let loggedUser = this.$store.state.auth.user
        const { Contact } = this.$FeathersVuex.api
        let userContact = new Contact({
          Id: loggedUser.ContactId,
          xLeave_From__c: date.extractDate(this.fromDate, 'YYYY/MM/DD'),
          xLeave_To__c: date.extractDate(this.toDate, 'YYYY/MM/DD')
        })

        userContact.save().then(res => {
          this.$q.loading.hide()

          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'check_circle_outline',
            message: this.$i18n.t('notification.leaveSaved')
          })

          this.$router.push('/home')
        }).catch(err => {
          this.$q.loading.hide()
          Vue.config.errorHandler(err)
        })
      }
    },
    hideFromDate () {
      this.$refs.fromDateProxy.hide()
    },
    hideToDate () {
      this.$refs.toDateProxy.hide()
    }
  },
  validations: {
    fromDate: {
      required
    },
    toDate: {
      required
    }
  }
}
</script>

<style>
</style>
