<template>
	<div class="tabs-header">
		<h2 class="tabs-header__title" v-if="title">
			<component :is="icon" />
			{{ title }}
		</h2>
		<CustomButton v-if="buttonLabel" :icon-left="buttonIcon" :loading="loading" class="tabs-header__button"
		              hide-on-mobile-label @click="buttonCallback">{{ buttonLabel }}
		</CustomButton>
		<CustomInput v-if="searchable" class="tabs-header__input" placeholder="Rechercher ..."
		             @update:modelValue="onSearch" />
	</div>
</template>

<script>
	import { defineComponent } from "vue"

	export default defineComponent({
		name: "TabsHeader",
		props: {
			title: {
				type: String,
				default: ""
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
			},
			searchable: {
				type: Boolean,
				default: false
			}
		},
		setup(props, { emit }) {
			/* Methods */
			const buttonCallback = (e) => {
				emit("callback", e)
			}
			const onSearch = (v) => {
				emit("update:modelValue", v)
			}

			return {
				buttonCallback,
				onSearch
			}
		}
	})
</script>