<template>
	<teleport to="#page-wrapper">
		<div v-if="show && showDialog" class="custom-dialog" :class="[isFullscreenClass]">
			<div v-if="!hideOverlay && !fullscreen" class="custom-dialog__overlay" />
			<div class="custom-dialog__content" :class="[placementClass]">
				<CustomTransition :name="transition"  @after-leave="onTransitionend">
					<div v-if="showBody" class="custom-dialog__content__body" :style="[maxWidthStyle, maxHeightStyle, heightStyle, noMarginStyle]">
						<slot/>
					</div>
				</CustomTransition>
			</div>
		</div>
	</teleport>
</template>

<script>
	import { computed, defineComponent, onMounted, ref, watch } from "vue"

	export default defineComponent({
    name: "CustomDialog",
		props: {
			maxWidth: {
				type: String,
				default: null
			},
			maxHeight: {
				type: String,
				default: null
			},
			height: {
				type: String,
				default: null
			},
    	fullscreen: {
    		type: Boolean,
		    default: false
	    },
			transition: {
				type: String,
				default: "scale"
			},
			hideOverlay: {
				type: Boolean,
				default: false
			},
			placement: {
				type: String,
				default: "center" // Values : "right" | "center" | "left"
			},
			noMargin: {
				type: Boolean,
				default: false
			},
			modelValue: {
				type: Boolean,
				default: false
			}
		},
		setup(props) {
			/* Datas */
			const show = ref(false)
			const showDialog = ref(false)
			const showBody = ref(false)

    	/* Computed */
    	const isFullscreenClass = computed(() => window.innerWidth <= 768 || props.fullscreen ? "custom-dialog--fullscreen" : "")
			const placementClass = computed(() => `custom-dialog__content--${props.placement}`)
			const maxWidthStyle = computed(() => { return { "max-width": props.maxWidth } })
			const maxHeightStyle = computed(() => { return { "max-height": props.maxHeight } })
			const heightStyle = computed(() => { return { "height": props.height } })
			const noMarginStyle = computed(() => props.noMargin ? { margin: 0 } : null)

			/* Methods */
			const onTransitionend = () => {
				showDialog.value = false
			}

			/* Watch */
			watch(() => props.modelValue, (modelValue) => {
				showBody.value = modelValue
				document.body.classList.toggle("custom-dialog--open")
				if(modelValue) {
					showDialog.value = modelValue
				}
			})

			/* Lifecycle hooks */
			onMounted(() => {
				show.value = true
			})

    	return {
		    /* Datas */
		    show,
		    showDialog,
		    showBody,
		    /* Methods */
		    onTransitionend,
    		/* Computed */
		    isFullscreenClass,
		    placementClass,
		    maxWidthStyle,
		    maxHeightStyle,
		    heightStyle,
		    noMarginStyle
	    }
		}
  })
</script>