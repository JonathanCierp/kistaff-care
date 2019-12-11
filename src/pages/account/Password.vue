<template>
  <q-page>
    <q-card flat>
      <div class="content-wrapper">
        <div class="main-content">
          <q-card-section>
            <q-input
              id="oldPassword"
              type="password"
              v-model="oldPassword"
              :label="this.$t('labels.old_password')"
              :error="this.$v.oldPassword.$error"
              required
              autofocus
            />

            <q-input
              id="password"
              type="password"
              v-model="password"
              :label="this.$t('labels.password')"
              :error="$v.password.$error"
              required
            />

            <q-input
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              :label="this.$t('labels.repeat_password')"
              :error="$v.confirmPassword.$error"
              required
            />
          </q-card-section>
        </div>
        <div class="toolbar q-pa-xs">
          <q-btn
            class="full-width"
            color="primary"
            @click="updatePassword"
          >
            {{ $t('buttons.submit') }}
          </q-btn>
        </div>
       </div>
    </q-card>
  </q-page>
</template>

<script>
import Vue from 'vue'
import { required, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'ChangePassword',
  data () {
    return {
      password: '',
      confirmPassword: '',
      oldPassword: ''
    }
  },
  methods: {
    updatePassword () {
      this.$v.password.$touch()
      this.$v.confirmPassword.$touch()
      this.$v.oldPassword.$touch()

      if (!this.$v.password.$error &&
          !this.$v.confirmPassword.$error &&
          !this.$v.oldPassword.$error) {
        this.$q.loading.show()

        const { Password } = this.$FeathersVuex.api
        let passoword = new Password({
          oldPassword: this.oldPassword,
          password: this.password })

        passoword.save().then(req => {
          this.$q.loading.hide()

          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'check_circle_outline',
            message: this.$i18n.t('notification.passwordChanged')
          })

          this.$router.push('/home')
        }).catch(err => {
          Vue.config.errorHandler(err)
        })
      }
    }
  },
  validations: {
    password: {
      required
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    oldPassword: {
      required
    }
  }
}
</script>

<style>
</style>
