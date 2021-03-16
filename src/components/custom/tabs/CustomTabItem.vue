<template>
  <div class="custom-tab-item" :data-tab="name">
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "CustomTabItem",
		props: {
			name: {
    		type: [Number, String],
		    default: 0
	    }
		}
  })
</script>