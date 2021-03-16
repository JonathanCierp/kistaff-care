<template>
	<button
			:class="[typeClass, sizeClass, roundedClass, roundedClass, outlinedClass, flatClass, blockClass, iconClass,
			textClass, centerClass, hideContentIfLoadingClass, hideOnMobileLabelClass]"
			:disabled="disabled" :type="nativeType" class="custom-button" role="button">
		<component :is="iconLeft" v-if="iconLeft" class="custom-button__icon-left" />
		<span class="custom-button__content">
      <slot />
    </span>
		<component :is="iconRight" v-if="iconRight" class="custom-button__icon-right" />
		<CustomProgressCircle v-if="loading" class="custom-button__loader" color="currentColor" indeterminate :size="progressElementSize" />
	</button>
</template>

<script>
	import { computed, defineComponent } from "vue"

	export default defineComponent({
		name: "CustomButton",
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
			},
			iconRight: {
				type: String,
				default: ""
			},
			center: {
				type: Boolean,
				default: false
			},
			hideOnMobileLabel: {
				type: Boolean,
				default: false
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
			const centerClass = computed(() => props.center ? "custom-button--center" : "")
			const hideContentIfLoadingClass = computed(() => props.loading ? "custom-button__content--hidden" : "")
			const hideOnMobileLabelClass = computed(() => props.hideOnMobileLabel ? "custom-button--mobile-hidden" : "")
			const progressElementSize = computed(() => {
				let size = 0

				if(props.size === "xs") {
					size = 12
				}else if(props.size === "sm") {
					size = 16
				}else if(props.size === "md") {
					size = 20
				}else if(props.size === "lg") {
					size = 24
				}else if(props.size === "xl") {
					size = 28
				}

				return size
			})

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
				centerClass,
				hideContentIfLoadingClass,
				hideOnMobileLabelClass,
				progressElementSize
			}
		}
	})
</script>