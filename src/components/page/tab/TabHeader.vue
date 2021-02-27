<template>
	<div class="tabs-header">
		<h2 class="tabs-header__title">
			<component :is="icon"></component>
			{{ title }}
		</h2>
		<CustomButton v-if="buttonLabel" class="tabs-header__action" @click="buttonCallback">{{ buttonLabel }}</CustomButton>
	</div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "TabsHeader",
		props: {
			title: {
				type: String,
				required: true
			},
			buttonLabel: {
				type: String,
				default: ""
			},
			icon: {
				type: String,
				default: ""
			}
		},
		setup(props, { emit }) {
    	/* Methods */
			const buttonCallback = (e) => {
				emit("callback", e)
			}
			
			return {
				buttonCallback
			}
		}
  })
</script>