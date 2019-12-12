<template>
  <q-card flat v-if="ready"
    name="record-details">
    <div class="content-wrapper">
      <div class="main-content">
        <q-card-section
          v-for="section in availableSections"
          :key="section.secRank">
          <span class="text-subtitle2">{{ section.label }}</span>
          <div
            v-for="layoutColumn in section.layoutColumns"
            :key="layoutColumn.colRank">
            <div
              v-for="layoutItem in layoutColumn.layoutItems"
              :key="layoutItem.field">
              <record-field v-if="!isContactName(metadata, layoutItem.field)"
                @valueChanged="handleValueChanged"
                :record="record"
                :metadata="metadata"
                :fieldName="layoutItem.field"
                :behavior="layoutItem.behavior"
                :mode="mode"/>
              <div v-else>
                <record-field @valueChanged="handleValueChanged"
                          :record="record"
                          :metadata="metadata"
                          fieldName="Salutation"
                          :mode="mode"/>

                <record-field @valueChanged="handleValueChanged"
                          :record="record"
                          :metadata="metadata"
                          fieldName="FirstName"
                          :mode="mode"/>

                <record-field @valueChanged="handleValueChanged"
                          :record="record"
                          :metadata="metadata"
                          fieldName="LastName"
                          :mode="mode"/>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section v-if="mode=='view'">
          <slot name="actions"/>
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
        </q-btn-group>
      </div>
    </div>
  </q-card>
</template>

<script>
import Vue from 'vue'
import RecordField from './RecordField'

export default {
  name: 'RecordDetails',
  props: ['serviceName', 'sobjectId', 'sobjectName', 'layoutName'],
  data () {
    return {
      updatedFields: new Set([]),
      metadata: null,
      layout: null,
      object: null,
      mode: 'view'
    }
  },
  components: {
    'record-field': RecordField
  },
  computed: {
    ready () {
      return this.layout != null &&
             this.metadata != null &&
             this.record != null
    },
    availableSections () {
      if (this.layout) {
        return this.layout.Metadata.layoutSections.filter(
          (section) => {
            let result = section.label !== 'Custom Links'
            result = result && section.label !== 'Contact Information'

            return result
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

    // Get the record
    let servicePath = this.serviceName + '/get'
    this.$store.dispatch(servicePath, this.sobjectId).then(record => {
      this.record = record
    })

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
      this.$q.loading.show()

      let servicePath = this.serviceName + '/update'
      const updatedRecord = Object.keys(this.record)
        .filter(key => this.updatedFields.has(key))
        .reduce((obj, key) => {
          obj[key] = this.record[key]
          return obj
        }, {})

      this.$store.dispatch(servicePath, [this.record.Id, updatedRecord]).then(res => {
        this.$q.loading.hide()

        this.$q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'check_circle_outline',
          message: this.$i18n.t('notification.recordSaved')
        })

        this.updatedFields = new Set([])
        this.mode = 'view'
      }).catch(err => {
        this.$q.loading.hide()
        Vue.config.errorHandler(err)
      })
    },
    toggleEditMode () {
      this.updatedFields = new Set([])
      this.mode = (this.mode === 'view') ? 'edit' : 'view'
    },
    handleValueChanged (e) {
      let value = e.value

      // PickList value
      if (e.fieldType === 'PICKLIST' && value) {
        value = value.value
      }
      // MultiPickList value
      if (e.fieldType === 'MULTIPICKLIST' && value) {
        value = value.map((x) => { return x.value }).join(';')
      }

      this.record[e.fieldName] = value
      this.updatedFields.add(e.fieldName)
    }
  }
}
</script>

<style>
</style>
