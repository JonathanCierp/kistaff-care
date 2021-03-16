<template>
  <div class="custom-dialog-title">
    <h2>{{ label }}</h2>
	  <IconClose @click="$emit('close')" />
  </div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "CustomDialogTitle",
		props: {
    	label: {
    		type: String,
		    default: ""
	    }
		}
  })
</script>