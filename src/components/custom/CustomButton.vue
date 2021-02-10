<template>
	<button :type="nativeType" class="custom-button" role="button">
     <span class="custom-button__content">
      <slot />
    </span>
	</button>
</template>

<script>
	import { defineComponent } from "vue"

	export default defineComponent({
		name: "CustomButton",
		props: {
			type: {
				type: String,
				default: "primary",
			},
			nativeType: {
				type: String,
				default: "button"
			}
		},
		setup () {


			return {}
		}
	})
</script>