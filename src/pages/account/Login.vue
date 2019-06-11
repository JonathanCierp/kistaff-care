<template>
  <q-page class="flex flex-center">
    <q-card
      square
      class="login-card"
      style="width: 400px; padding:10px"
      >
      <q-card-section>
        <div class="absolute-center">
            <img src="~assets/app-logo.png" class="app-logo"/>
        </div>
      </q-card-section>
      <br/>
      <q-card-section>
        <div class="text-h6 text-center">
          {{ $t('headers.login') }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          id="email"
          type="email"
          v-model.trim="email"
          :label="this.$t('labels.email')"
          :error="this.$v.email.$error"
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
          @keyup.enter="login"
        />
        <q-checkbox
          id="rememberMe"
          v-model="rememberMe"
          :label="this.$t('labels.remember_me')"
        />
      </q-card-section>

      <q-card-actions>
        <q-btn
          class="full-width"
          color="primary"
          :loading="loading"
          @click="login"
        >
          {{ $t('buttons.login') }}
        </q-btn>
      </q-card-actions>
      <div class="row q-ma-md">
        <div class="col">
          <router-link to="/password/forgot">
            <a>{{ this.$t('labels.password_forgot') }}</a>
          </router-link>
        </div>
        <div class="col text-right">
          <router-link to="/login/signup">
            <a>{{ this.$t('labels.signup_member') }}</a>
          </router-link>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      rememberMe: false,
      loading: false
    }
  },
  methods: {
    login () {
      this.$v.email.$touch()
      this.$v.password.$touch()

      if (!this.$v.email.$error &&
          !this.$v.password.$error) {
        this.loading = true

        this.$auth.login({
          strategy: 'local',
          email: this.email,
          password: this.password
        }).finally(() => {
          this.loading = false
        })
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }
}
</script>
