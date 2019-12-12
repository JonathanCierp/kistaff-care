<template>
  <q-page class="flex flex-center">
    <q-card
      square
      class="login-card"
      style="width: 400px; padding:10px">
      <q-card-section>
        <div class="absolute-center">
            <img src="/statics/images/app-logo.png" class="app-logo"/>
        </div>
      </q-card-section>
      <br/>
      <q-card-section>
        <div class="text-h7 text-center">
          {{ $t('headers.password_forgot') }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          id="email"
          type="text"
          v-model.trim="email"
          :label="this.$t('labels.email')"
          required
          autofocus
          :error="$v.email.$error"
        />
      </q-card-section>

      <q-card-actions>
        <q-btn
          class="fit"
          color="primary"
          @click="resetPassword">
          {{ $t('buttons.submit') }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import Vue from 'vue'
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    resetPassword () {
      this.$v.email.$touch()

      if (!this.$v.email.$error) {
        this.$q.loading.show()

        const { Password } = this.$FeathersVuex.api
        let passoword = new Password({
          email: this.email,
          action: 'reset'
        })

        passoword.save().then(res => {
          this.$q.loading.hide()

          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'check_circle_outline',
            message: this.$i18n.t('notification.passwordReset')
          })

          this.$router.push('/login')
        }).catch(err => {
          this.$q.loading.hide()
          Vue.config.errorHandler(err)
        })
      }
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
}
</script>
