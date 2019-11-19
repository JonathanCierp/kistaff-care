<template>
  <q-page>
    <q-card flat>
      <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="upcoming">
            <q-list>
                <mission-item
                    v-for="mission in upcomingMissions"
                    :key="mission.Id"
                    :mission="mission"
                    class="mission-item"/>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="history">
            <q-list>
                <mission-item
                    v-for="mission in historyMissions"
                    :key="mission.Id"
                    :mission="mission"
                    class="mission-item"/>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>

        <q-tabs dense
          v-model="tab"
          class="bg-primary text-white fixed-bottom full-width"
          align="justify"
          position="bottom"
          narrow-indicator>
          <q-tab name="upcoming"
            :label="this.$t('workspace.upcoming') + ' (' + upcomingMissions.length +')'"></q-tab>
          <q-tab name="history"
            :label="this.$t('workspace.history') + ' (' + historyMissions.length +')'"></q-tab>
      </q-tabs>
    </q-card>
  </q-page>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'
import MissionItem from '../../components/workspace/MissionItem'

export default {
  name: 'Missions',
  components: {
    'mission-item': MissionItem
  },
  mixins: [
    makeFindMixin({ service: 'missions' })
  ],
  computed: {
    missionsParams () {
      return {
        query: {
          $limit: 200,
          xIsConfirmed__c: true,
          xStatus__c: {
            $in: [
              'Assigned',
              'Closed'
            ]
          },
          xExecution_Status__c: {
            $in: [
              'Executed',
              null
            ]
          }
        }
      }
    },
    upcomingMissions: function () {
      return this.missions.filter(function (x) {
        return x.upcoming
      })
    },
    historyMissions: function () {
      return this.missions.filter(function (x) {
        return !x.upcoming
      })
    }
  },
  data () {
    return {
      tab: 'upcoming'
    }
  }
}
</script>

<style>
.mission-item {
  border-bottom: 1px solid rgba(0,0,0,0.12);
}

.q-tab-panel {
  padding: 0px;
}
</style>
