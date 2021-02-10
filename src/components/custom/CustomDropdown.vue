<template>
	<div class="custom-dropdown">
		<custom-button class="custom-dropdown__title">
			<slot name="title"></slot>
		</custom-button>
	</div>
</template>

<script>
	import { defineComponent } from "vue"
	import CustomButton from "./CustomButton.vue"

	export default defineComponent({
		name: "CustomDropdown",
		components: {
			CustomButton
		},
		setup: () => {

		}
	})
</script>