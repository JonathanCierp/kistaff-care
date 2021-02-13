<template>
	<button :class="[typeClass, sizeClass, roundedClass, roundedClass, outlinedClass, flatClass, blockClass, iconClass, textClass]"
	        :disabled="disabled" :type="nativeType" class="custom-button" role="button">
     <span class="custom-button__content">
      <slot />
    </span>
		<component v-if="iconLeft" :is="iconLeft" />
	</button>
</template>

<script>
	import { defineComponent, computed } from "vue"
	import IconChevronDown from "../icons/IconChevronDown.vue"

	export default defineComponent({
		name: "CustomButton",
		components: {
			IconChevronDown
		},
		props: {
			type: {
				type: String,
				default: "info"
			},
			size: {
				type: String,
				default: "md"
			},
			rounded: {
				type: String,
				default: ""
			},
			outlined: {
				type: Boolean,
				default: false
			},
			flat: {
				type: Boolean,
				default: true
			},
			nativeType: {
				type: String,
				default: "button"
			},
			block: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			icon: {
				type: Boolean,
				default: false
			},
			text: {
				type: Boolean,
				default: false
			},
			iconLeft: {
				type: String,
				default: ""
			}
		},
		setup(props) {
			/* Computed */
			const typeClass = computed(() => props.type ? `custom-button--${props.type}` : "")
			const sizeClass = computed(() => props.size ? `custom-button--${props.size}` : "")
			const roundedClass = computed(() => props.rounded ? `custom-button--rounded-${props.rounded}` : "")
			const outlinedClass = computed(() => props.outlined ? "custom-button--outlined" : "")
			const flatClass = computed(() => props.flat ? "custom-button--flat" : "")
			const blockClass = computed(() => props.block ? "custom-button--block" : "")
			const iconClass = computed(() => props.icon ? "custom-button--icon" : "")
			const textClass = computed(() => props.text ? "custom-button--text" : "")
			const hideContentIfLoadingClass = computed(() => props.loading ? "custom-button__content--hidden" : "")

			return {
				/* Computed */
				typeClass,
				sizeClass,
				roundedClass,
				outlinedClass,
				flatClass,
				blockClass,
				iconClass,
				textClass,
				hideContentIfLoadingClass
			}
		}
	})
</script>