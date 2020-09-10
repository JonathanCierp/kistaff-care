
<template>
  <q-page>
    <div class="content-wrapper">
      <div class="main-content">
        <div class="row">
          <!-- Missions programmées -->
          <div class="col q-ma-md shadow-2">
            <q-card flat>
              <q-card-section class="row">
                <div class="float-left">
                  <q-avatar rounded size="60px" color="positive" text-color="white">
                    <q-icon name="event" />
                  </q-avatar>
                </div>
                <div class="float-left q-ml-md">
                  <span class="text-h4">{{upcomingMissions.length}}</span> <br/>
                  <span class="text-subtitle2">Missions programmées</span>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="center">
                <q-btn flat
                  color="primary"
                  class="full-width"
                  size="sm"
                  to="/missions">Voir tout</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <!-- Missions à confirmer -->
        <div class="row">
          <div class="col q-mb-md q-ml-md q-mr-md shadow-2">
            <q-card flat="">
              <q-card-section class="row">
                <div class="float-left">
                  <q-avatar rounded size="60px" color="warning" text-color="white">
                    <q-icon name="assignment_turned_in" />
                  </q-avatar>
                </div>
                <div class="float-left q-ml-md">
                  <span class="text-h4">{{assignedRequests.length}}</span> <br/>
                  <span class="text-subtitle2">Missions à confirmer</span>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="center">
                <q-btn flat
                  color="primary"
                  class="full-width"
                  size="sm"
                  to="/requests">Voir tout</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <!-- Nouvelles demandes -->
        <div class="row">
          <div class="col q-mb-md q-ml-md q-mr-md shadow-2">
            <q-card flat>
              <q-card-section class="row">
                <div class="float-left">
                  <q-avatar rounded square size="60px" color="secondary" text-color="white">
                    <q-icon name="shop_two" />
                  </q-avatar>
                </div>
                <div class="float-left q-ml-md">
                  <span class="text-h4">{{newRequests.length}}</span> <br/>
                  <span class="text-subtitle2">Nouvelles demandes</span>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="center">
                <q-btn flat
                  color="primary"
                  class="full-width"
                  size="sm"
                  to="/requests">Voir tout</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>

        <!-- Organisations actives -->
        <div class="row">
          <div class="col q-mb-md q-ml-md q-mr-md shadow-2">
            <q-card flat>
              <q-card-section class="row">
                <div class="float-left">
                  <q-avatar rounded size="60px" color="primary" text-color="white">
                    <q-icon name="location_city" />
                  </q-avatar>
                </div>
                <div class="float-left q-ml-md">
                  <span class="text-h4">{{activeOrganizations.length}}</span> <br/>
                  <span class="text-subtitle2">Etablissemnts actifs</span>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="center">
                <q-btn flat
                  color="primary"
                  class="full-width"
                  size="sm"
                  to="/organizations">Voir tout</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
      <div class="toolbar">
        <div class="q-pa-xs full-width">
          <q-btn class="full-width"
            color="primary"
            label="Déclarer une absence"
            to="/profile/leave" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'

export default {
  name: 'Home',
  mixins: [
    makeFindMixin({ service: 'missions' }),
    makeFindMixin({ service: 'requests' }),
    makeFindMixin({ service: 'organizations' })
  ],
  computed: {
    missionsParams () {
      return {
        query: {
          $limit: 200,
          xIsConfirmed__c: true,
          xStatus__c: {
            $in: [
              'Assigned'
            ]
          }
        },
        paginate: false
      }
    },
    requestsParams () {
      return {
        query: {
          $limit: 200,
          xStatus__c: {
            $in: [
              'Requested',
              'Selected'
            ]
          },
          xIs_Available__c: true
        },
        paginate: false
      }
    },
    organizationsParams () {
      return {
        query: {
          $limit: 200,
          xActiveOrg__c: true,
          xStatus__c: {
            $in: [
              'Accepted',
              'Suspended'
            ]
          }
        },
        paginate: false
      }
    },
    newRequests: function () {
      return this.requests.filter(function (x) {
        return x.xStatus__c === 'Requested' && x.upcoming
      })
    },
    assignedRequests: function () {
      return this.requests.filter(function (x) {
        return x.xStatus__c !== 'Requested' && x.upcoming
      })
    },
    upcomingMissions: function () {
      return this.missions.filter(function (x) {
        return x.upcoming
      })
    },
    activeOrganizations: function () {
      return this.organizations.filter(function (x) {
        return x.xStatus__c === 'Accepted'
      })
    }
  }
}
</script>

<style>
</style>
