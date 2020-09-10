<template>
  <!-- Checkbox field -->
  <q-select v-if="isCheckbox"
    :id="field.name"
    :label="field.label"
    :readonly="isReadonly"
    v-model="fieldValue"
    :options="options"/>

  <!-- Date field -->
  <q-input v-else-if="isDate"
    :id="field.name"
    :label="field.label"
    :required="required"
    :readonly="isReadonly"
    v-model="fieldValue"
    :rules="['date']"
    mask="date">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date v-model="fieldValue" @input="() => $refs.qDateProxy.hide()" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>

  <!-- Time field -->
  <q-input v-else-if="isTime"
    :id="field.name"
    :label="field.label"
    :required="required"
    :readonly="isReadonly"
    v-model="fieldValue"
    :rules="['time']"
    mask="time">
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time v-model="fieldValue" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>

  <!-- DateTime field -->
  <q-input v-else-if="isDateTime"
    :id="field.name"
    :label="field.label"
    :required="required"
    :readonly="isReadonly"
    v-model="fieldValue">
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="fieldValue" mask="YYYY-MM-DD HH:mm" />
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time v-model="fieldValue" mask="YYYY-MM-DD HH:mm" format24h />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>

  <!-- PickList field -->
  <q-select v-else-if="isPickList"
    :id="field.name"
    :label="field.label"
    :required="required"
    :readonly="isReadonly"
    v-model="fieldValue"
    :options="options"/>

  <!-- MultiPickList field -->
  <q-select v-else-if="isMultiPickList"
    multiple
    :id="field.name"
    :label="field.label"
    :required="required"
    :readonly="isReadonly"
    v-model="fieldValue"
    :options="options"/>

  <!-- Address field -->
  <div v-else-if="isAddress">
    <!-- Street -->
    <q-input  type="text"
      :label="this.$t('Address.Street')"
      :id="field.name + 'Street' "
      :readonly="isReadonly"
      v-model="fieldValue.street"/>

    <!-- Zip Code -->
    <q-input  type="text"
      :label="this.$t('Address.PostalCode')"
      :id="field.name + 'PostalCode' "
      :readonly="isReadonly"
      v-model="fieldValue.postalCode"/>

    <!-- City -->
    <q-input  type="text"
      :label="this.$t('Address.City')"
      :id="field.name + 'City' "
      :readonly="isReadonly"
      v-model="fieldValue.city"/>
  </div>

  <!-- Other fields -->
  <q-input v-else
    :id="field.name"
    :label="field.label"
    :required="required"
    :type="inputType"
    :readonly="isReadonly"
    v-model="fieldValue"/>
 </template>

<script>
const fieldInputMap = {
  'TEXTAREA': 'textarea',
  'STRING': 'text',
  'BOOLEAN': 'checkbox',
  'COMBOBOX': 'text',
  'CURRENCY': 'text',
  'DATE': 'date',
  'DATETIME': 'text',
  'DOUBLE': 'number',
  'ADRESS': 'text',
  'EMAIL': 'email',
  'INTEGER': 'number',
  'PERCENT': 'number',
  'MULTIPICKLIST': 'text',
  'PICKLIST': 'text',
  'PHONE': 'tel',
  'REFERENCE': 'search',
  'URL': 'url',
  'TIME': 'time'
}

export default {
  name: 'RecordField',
  props: ['metadata', 'record', 'fieldName', 'behavior', 'mode'],
  data () {
    return {
      field: null,
      fieldType: null,
      inputType: null,
      fieldValue: null,
      initialized: false
    }
  },
  created: function () {
    if (this.metadata) {
      // set the field
      this.field = this.metadata.fields.find((f) => {
        return f.name === this.fieldName
      })

      // set the types
      this.fieldType = this.field.type.toUpperCase()
      this.inputType = fieldInputMap[this.fieldType]

      // set the value
      let value = this.record[this.fieldName]
      if (this.fieldType === 'PICKLIST' || this.fieldType === 'BOOLEAN') {
        this.fieldValue = this.options.find(op => {
          return op.value === value
        })
      } else if (this.fieldType === 'MULTIPICKLIST') {
        let selectedOptions = (value || '').split(';')

        this.fieldValue = this.options.filter(op => {
          return selectedOptions.includes(op.value)
        })
      } else {
        this.fieldValue = value
      }
    }
  },
  computed: {
    required () {
      return this.field.behavior === 'Required'
    },
    isReadonly () {
      return this.mode === 'view' ||
             this.field.behavior === 'Readonly'
    },
    isDate () {
      return this.fieldType === 'DATE'
    },
    isPickList () {
      return this.fieldType === 'PICKLIST'
    },
    isMultiPickList () {
      return this.fieldType === 'MULTIPICKLIST'
    },
    isCheckbox () {
      return this.fieldType === 'BOOLEAN'
    },
    isTime () {
      return this.fieldType === 'TIME'
    },
    isDateTime () {
      return this.fieldType === 'DATETIME'
    },
    isAddress () {
      return this.fieldType === 'ADDRESS'
    },
    options () {
      if (this.isCheckbox) {
        return [{
          value: true,
          label: 'Oui'
        },
        {
          value: false,
          label: 'Non'
        }]
      }
      return this.field.picklistValues
    }
  },
  watch: {
    fieldValue: function (newValue, oldValue) {
      if (this.initialized) {
        this.$emit('valueChanged', {
          fieldName: this.field.name,
          fieldType: this.fieldType,
          value: this.fieldValue
        })
      } else {
        this.initialized = true
      }
    }
  }
}
</script>

<style>
</style>
