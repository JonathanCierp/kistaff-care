import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../lib/feathersClient'
import { date } from 'quasar'

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

export default new Vuex.Store({
  plugins: [
    // Users Service
    service('users', { idField: 'Id' }),

    // Auth Service
    auth({ userService: 'users' }),

    // Sobjects Service
    service('sobjects', {
      idField: 'name'
    }),

    // Layouts Service
    service('layouts', {
      idField: 'Id'
    }),

    // LayoutInfos Service
    service('layoutInfos', {
      idField: 'Id'
    }),

    // Listviews Service
    service('listviews', {
      idField: 'Id'
    }),

    // Contacts Service
    service('contacts', {
      idField: 'Id'
    }),

    // Messages Service
    service('messages', {
      idField: 'Id',
      instanceDefaults (data, { store, Model, Models }) {
        return {
          get publishedAt () {
            return date.formatDate(this.CreatedDate, 'MMM DD, YYYY, hh:mm a.')
          },
          get title () {
            let typeToLabel = {
              'New Job': 'Nouvelle mission',
              'Job Assignment': 'Affectation de mission',
              'Job Cancellation': 'Annulation de mission',
              'Assignment Confirmation': 'Confirmation de mission',
              'Checkin': 'Check In',
              'Checkout': 'Check Out'
            }

            return typeToLabel[this.xType__c]
          }
        }
      }
    }),

    // Requests Service
    service('requests', {
      idField: 'Id',
      instanceDefaults (data, { store, Model, Models }) {
        return {
          get api_key () {
            return 'AIzaSyC4i-pG8Fws9BIp5ZFlqMNF7Il28yuK8I0'
          },
          get fromDate () {
            return date.formatDate(
              this.xService_Request__r.xFromDate__c,
              'DD MMM YYYY à hh:mm'
            )
          },
          get toDate () {
            return date.formatDate(
              this.xService_Request__r.xToDate__c,
              'DD MMM YYYY à hh:mm'
            )
          },
          get geoLink () {
            if (this.xService_Request__r.xAddress__c) {
              return `http://maps.google.com/maps?q=${this.xService_Request__r.xAddress__c}`
            }

            return null
          },
          get geoImage () {
            if (this.xService_Request__r.xAddress__c) {
              return `https://maps.googleapis.com/maps/api/staticmap?` +
              `center=${this.xService_Request__r.xAddress__c}&` +
              `markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${this.xService_Request__r.xAddress__c}&` +
              `zoom=11&scale=1&size=500x750&maptype=roadmap&format=png&` +
              `visual_refresh=true&key=${this.api_key}`
            }

            return null
          },
          get message () {
            if (this.xStatus__c === 'Requested') {
              if (this.xService_Request__r.xDetails__c) {
                return this.xService_Request__r.xDetails__c
              } else {
                return this.xNewJobMsg__c
              }
            } else {
              return this.xAssignmentMsg__c
            }
          },
          get label () {
            return `${this.xService_Request__r.xOrganization__r.Name} | \
                    ${this.xService_Request__r.xSubject__c}`
          },
          get icon () {
            if (this.xStatus__c === 'Requested') {
              return 'insert_invitation'
            } else {
              return 'event_available'
            }
          },
          get iconColor () {
            if (this.xStatus__c === 'Requested') {
              return 'blue-6'
            } else {
              return 'green-6'
            }
          },
          get title () {
            if (this.xStatus__c === 'Requested') {
              return 'Êtes-vous intéressé(e)?'
            } else {
              return 'Êtes-vous toujours disponible?'
            }
          }
        }
      }
    }),

    // Missions Service
    service('missions', {
      idField: 'Id',
      instanceDefaults (data, { store, Model, Models }) {
        return {
          get api_key () {
            return 'AIzaSyC4i-pG8Fws9BIp5ZFlqMNF7Il28yuK8I0'
          },
          get fromDate () {
            return date.formatDate(
              this.xFromDate__c,
              'DD MMM YYYY à hh:mm'
            )
          },
          get toDate () {
            return date.formatDate(
              this.xToDate__c,
              'DD MMM YYYY à hh:mm'
            )
          },
          get label () {
            return `${this.xOrganization__r.Name} | \
                    ${this.xSubject__c}`
          },
          get icon () {
            return 'event_available'
          },
          get iconColor () {
            if (this.upcoming) {
              return 'green-6'
            }
            return 'grey-5'
          },
          get message () {
            return this.xAssignmentMsg__c
          },
          get upcoming () {
            return new Date(this.xFromDate__c) >= new Date()
          },
          get geoLink () {
            if (this.xAddress__c) {
              return `http://maps.google.com/maps?q=${this.xAddress__c}`
            }

            return null
          },
          get geoImage () {
            if (this.xAddress__c) {
              return `https://maps.googleapis.com/maps/api/staticmap?` +
              `center=${this.xAddress__c}&` +
              `markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${this.xAddress__c}&` +
              `zoom=11&scale=1&size=500x750&maptype=roadmap&format=png&` +
              `visual_refresh=true&key=${this.api_key}`
            }

            return null
          }
        }
      }
    }),

    // Organizations Service
    service('organizations', {
      idField: 'Id',
      instanceDefaults (data, { store, Model, Models }) {
        return {
          get label () {
            return this.Account.Name
          },
          get color () {
            if (this.xStatus__c === 'Accepted') {
              return 'green-6'
            }
            return 'grey-5'
          }
        }
      }
    })
  ]
})
