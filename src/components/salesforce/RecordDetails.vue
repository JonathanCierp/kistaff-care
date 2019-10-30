<template>
  <q-form v-if="ready"
    name="record-details"
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md">
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
            :behavior="layoutItem.behavior"/>
          <div v-else>
            <record-field :record="record"
                      :metadata="metadata"
                      fieldName="Salutation"/>

            <record-field :record="record"
                      :metadata="metadata"
                      fieldName="FirstName"/>

            <record-field :record="record"
                      :metadata="metadata"
                      fieldName="LastName"/>
          </div>
        </div>
      </div>
    </q-card-section>
    <div>
      <q-btn :label="this.$t('buttons.submit')" type="submit" color="primary"/>
      <q-btn :label="this.$t('buttons.cancel')" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
import { makeGetMixin } from 'feathers-vuex'
import RecordField from './RecordField'

export default {
  name: 'RecordDetails',
  props: ['serviceName', 'sobjectId', 'sobjectName', 'layoutName'],
  data () {
    return {
      metadata: null,
      layout: null
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
    const { Sobject } = this.$FeathersVuex
    const { Layout } = this.$FeathersVuex
    const { Layoutinfo } = this.$FeathersVuex
    const sobjectName = this.sobjectName
    const layoutName = this.layoutName

    // Get the object metadata
    Sobject.get(this.sobjectName).then(metadata => {
      this.metadata = metadata

      // Find the layout
      Layout.find({
        query: {
          $sobject: sobjectName,
          $layout: layoutName
        }
      }).then(layouts => {
        // Get the layout details
        if (layouts && layouts.length === 1) {
          Layoutinfo.get(layouts[0].Id).then(layout => {
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
    onSubmit () {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: 'Submitted'
      })
    },

    onReset () {
      console.log('reset')
    }
  }
}
</script>

<style>
</style>
