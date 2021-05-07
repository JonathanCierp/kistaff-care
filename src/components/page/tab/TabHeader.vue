<template>
	<div class="tabs-header">
		<h2 class="tabs-header__title" :class="[hideLabelOnMobile ? 'hide-on-mobile' : '']" v-if="title">
			<component v-if="icon" :is="icon" />
			{{ title }}
		</h2>
		<CustomFloatingButton v-if="isMobile && (buttonLabel || buttonIcon)" :icon-left="buttonIcon" :loading="loading" class="tabs-header__button"
		              @click="buttonCallback">{{ buttonLabel }}
		</CustomFloatingButton>
		<CustomButton v-else-if="!isMobile && (buttonLabel || buttonIcon)" :icon-left="buttonIcon" :loading="loading" class="tabs-header__button"
		              @click="buttonCallback">{{ buttonLabel }}
		</CustomButton>
		<CustomInput v-if="searchable" class="tabs-header__input" placeholder="Rechercher ..."
		             @update:modelValue="onSearch" />
	</div>
</template>

<script>
	import { defineComponent, ref } from "vue"

	export default defineComponent({
		name: "TabsHeader",
		props: {
			modelValue: {
				type: String,
				default: ""
			},
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
			},
			hideLabelOnMobile: {
				type: Boolean,
				default: false
			}
		},
		emits: ["callback", "update:modelValue"],
		setup(props, { emit }) {
			const isMobile = ref(window.innerWidth < 500)

			/* Methods */
			const buttonCallback = (e) => {
				emit("callback", e)
			}
			const onSearch = (v) => {
				emit("update:modelValue", v)
			}

			return {
				isMobile,
				buttonCallback,
				onSearch
			}
		}
	})
</script>