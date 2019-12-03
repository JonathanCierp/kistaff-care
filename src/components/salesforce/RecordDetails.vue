<template>
  <q-card flat v-if="ready"
    name="record-details">
    <div class="content-wrapper">
      <div class="main-content">
        <q-card-section
          v-for="section in availableSections"
          :key="section.secRank">
          <p>{{ section.label }}</p>
          <div
            v-for="layoutColumn in section.layoutColumns"
            :key="layoutColumn.colRank">
            <div
              v-for="layoutItem in layoutColumn.layoutItems"
              :key="layoutItem.field">
              <record-field v-if="!isContactName(metadata, layoutItem.field)"
                :record="record"
                :metadata="metadata"
                :fieldName="layoutItem.field"
                :behavior="layoutItem.behavior"
                :mode="mode"/>
              <div v-else>
                <record-field :record="record"
                          :metadata="metadata"
                          fieldName="Salutation"
                          :mode="mode"/>

                <record-field :record="record"
                          :metadata="metadata"
                          fieldName="FirstName"
                          :mode="mode"/>

                <record-field :record="record"
                          :metadata="metadata"
                          fieldName="LastName"
                          :mode="mode"/>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>

      <div class="toolbar">
        <q-btn-group v-if="mode=='edit'"
          spread flat
          class="full-width q-pa-xs">
          <q-btn :label="this.$t('buttons.save')"
            @click="saveRecord"
            color="primary"
            class="q-pa-sm"/>
          <q-btn :label="this.$t('buttons.cancel')"
            @click="toggleEditMode"
            color="grey-2"
            text-color="primary"
            class="q-pa-sm"/>
        </q-btn-group>

        <q-btn-group v-if="mode=='view'"
          spread flat
          class="full-width q-pa-xs">
          <q-btn :label="this.$t('buttons.update')"
            @click="toggleEditMode"
            color="primary"
            class="q-pa-sm"/>
          <q-btn :label="this.$t('buttons.password')"
            color="dark"
            class="q-pa-sm"/>
        </q-btn-group>
      </div>
    </div>
  </q-card>
</template>

<script>
import RecordField from './RecordField'

import { makeGetMixin } from 'feathers-vuex'

export default {
  name: 'RecordDetails',
  props: ['serviceName', 'sobjectId', 'sobjectName', 'layoutName'],
  data () {
    return {
      metadata: null,
      layout: null,
      mode: 'view'
    }
  },
  components: {
    'record-field': RecordField
  },
  mixins: [
    makeGetMixin({
      name: 'records',
      service () {
        return this.serviceName
      }
    })
  ],
  computed: {
    ready () {
      return this.layout != null &&
             this.metadata != null &&
             this.record != null
    },
    recordId () {
      return this.sobjectId
    },
    recordServiceName () {
      return this.serviceName
    },
    availableSections () {
      if (this.layout) {
        return this.layout.Metadata.layoutSections.filter(
          (section) => {
            return section.label !== 'Custom Links'
          })
      }

      return null
    }
  },
  created: function () {
    const { SObject } = this.$FeathersVuex.api
    const { Layout } = this.$FeathersVuex.api
    const { LayoutInfo } = this.$FeathersVuex.api
    const sobjectName = this.sobjectName
    const layoutName = this.layoutName

    // Get the object metadata
    SObject.get(this.sobjectName).then(metadata => {
      this.metadata = metadata

      // Find the layout
      Layout.find({
        query: {
          $sobject: sobjectName,
          $layout: layoutName
        },
        paginate: false
      }).then(layouts => {
        // Get the layout details
        if (layouts && layouts.length === 1) {
          LayoutInfo.get(layouts[0].Id).then(layout => {
            if (layout && layout.Metadata) {
              let secRank = 0
              let colRank = 0
              layout.Metadata.layoutSections.forEach(section => {
                section.secRank = secRank++
                section.layoutColumns.forEach(column => {
                  column.colRank = colRank++
                })
              })
              this.layout = layout
            }
          })
        }
      })
    })
  },
  methods: {
    isContactName (metadata, fieldName) {
      return metadata.name === 'Contact' &&
             fieldName === 'Name'
    },
    saveRecord () {
      this.$q.notify({
        color: 'light-green',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: 'Submitted'
      })
    },
    toggleEditMode () {
      this.mode = (this.mode === 'view') ? 'edit' : 'view'
    }
  }
}
</script>

<style>
</style>
