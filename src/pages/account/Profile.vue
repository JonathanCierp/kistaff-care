<template>
  <q-page>
    <record-details v-if="loggedUser"
      serviceName="contacts"
      sobjectName="Contact"
      layoutName="Employee Layout (App)"
      :sobjectId="loggedUser.ContactId"/>
  </q-page>
</template>

<script>
import RecordDetails from '../../components/salesforce/RecordDetails'

export default {
  name: 'Profile',
  components: {
    'record-details': RecordDetails
  },
  computed: {
    loggedUser () {
      if (this.$store.state.auth) {
        if (this.$store.state.auth.user) {
          return this.$store.state.auth.user
        }
      }

      return null
    }
  }
}
</script>

<style>
</style>
