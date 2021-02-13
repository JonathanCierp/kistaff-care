<template>
  <div :style="[widthStyle]" class="custom-input">
	  <label :for="label.toLowerCase().replace(' ', '-')">{{ label }}</label>
	  <input :id="label.toLowerCase().replace(' ', '-')" :type="nativeType" :placeholder="placeholder" />
  </div>
</template>

<script>
	import { computed, defineComponent, ref } from "vue"

	export default defineComponent({
    name: "CustomInput",
		props: {
    	nativeType: {
    		type: String,
		    default: "text"
	    },
			width: {
				type: String,
				default: ""
			},
			placeholder: {
				type: String,
				default: ""
			},
			label: {
				type: String,
				default: ""
			}
		},
		setup: (props) => {
			/* Computed */
			const widthStyle = computed(() => {
				return { width: props.width }
			})

			return {
				/* Computed */
				widthStyle
			}
		}
  })
</script>