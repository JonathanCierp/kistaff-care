<template>
  <div class="page-header hide-on-mobile">
		<h1 class="text-h3 font-bold">{{ label }}</h1>
  </div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "PageHeader",
		props: {
    	label: {
		    type: String,
		    required: true
	    }
		}
  })
</script>