<template>
  <div class="custom-row" :class="[centerClass, noMarginClass]">
    <slot />
  </div>
</template>

<script>
	import { computed, defineComponent } from "vue"

	export default defineComponent({
    name: "CustomRow",
		props: {
    	center: {
    		type: Boolean,
		    default: false
	    },
			noMargin: {
				type: Boolean,
				default: false
			}
		},
		setup(props) {
			/* Computed */
			const centerClass = computed(() => props.center ? "custom-row--center" : "")
			const noMarginClass = computed(() => props.noMargin ? "custom-row--no-margin" : "")

			return {
				/* Computed */
				centerClass,
				noMarginClass
			}
		}
  })
</script>