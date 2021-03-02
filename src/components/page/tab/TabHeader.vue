<template>
	<div class="tabs-header">
		<h2 class="tabs-header__title">
			<component :is="icon" />
			{{ title }}
		</h2>
		<CustomButton v-if="buttonLabel" :icon-left="buttonIcon" class="tabs-header__action" :loading="loading" hide-on-mobile-label
		              :disabled="loading" @click="buttonCallback">{{ buttonLabel }}
		</CustomButton>
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
			buttonIcon: {
				type: String,
				default: ""
			},
			icon: {
				type: String,
				default: ""
			},
			loading: {
				type: Boolean,
				default: false
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