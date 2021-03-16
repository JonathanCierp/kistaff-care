<template>
	<CustomTransition :name="transitionName" @after-leave="closeAfterTransition">
		<div v-show="show" ref="root" :class="[positionClass, typeClass]" class="custom-notification" role="alert">
			<div v-if="showIcon" class="custom-notification__icon">
				<slot name="icon">
					<IconCircleFilledCheck v-if="type === 'success'" />
					<IconCircleFilledClose v-if="type === 'error'" />
					<IconCircleFilledInfo v-if="type === 'info'" />
					<IconCircleFilledWarning v-if="type === 'warning'" />
				</slot>
			</div>
			<p class="custom-notification__content__message" v-html="message"></p>
			<div v-if="closable" class="custom-notification__close" @click="close">
				<slot name="close">
					<IconClose />
				</slot>
			</div>
		</div>
	</CustomTransition>
</template>

<script>
	import { computed, defineComponent, onMounted, ref } from "vue"
	import { NOTIFICATION_TRANSITION } from "./notification"
	import IconCircleFilledCheck from "../../icons/IconCircleFilledCheck.vue"
	import IconCircleFilledClose from "../../icons/IconCircleFilledClose.vue"
	import IconCircleFilledInfo from "../../icons/IconCircleFilledInfo.vue"
	import IconCircleFilledWarning from "../../icons/IconCircleFilledWarning.vue"
	import CustomTransition from "../CustomTransition.vue"
	import IconClose from "../../icons/IconClose.vue"

	export default defineComponent({
		name: "CustomNotification",
		components: {
			CustomTransition,
			IconCircleFilledCheck,
			IconCircleFilledClose,
			IconCircleFilledInfo,
			IconCircleFilledWarning,
			IconClose
		},
		props: {
			message: {
				type: String,
				default: ""
			},
			type: {
				type: String,
				default: "default"
			},
			position: {
				type: String,
				default: "top-right"
			},
			closable: {
				type: Boolean,
				default: true
			},
			showIcon: {
				type: Boolean,
				default: true
			},
			duration: {
				type: [Number, String],
				default: 3000
			},
			onClose: {
				type: Function,
				default: () => {
				}
			}
		},
		setup(props) {
			/* Datas */
			const root = ref(null)
			const show = ref(true)

			/* Methods */
			const close = () => {
				show.value = false
			}
			const closeAfterTransition = () => {
				props.onClose(root.value.id)
			}

			/* Computed */
			const positionClass = computed(() => `custom-notification--${props.position}`)
			const typeClass = computed(() => `custom-notification--${props.type}`)
			const transitionName = computed(() => props.transition || NOTIFICATION_TRANSITION[props.position.replace("-", "_").toUpperCase()])

			/* Lifecycle hooks */
			onMounted(() => {
				setTimeout(() => {
					close()
				}, props.duration)
			})

			return {
				/* Datas */
				root,
				show,
				/* Methods */
				close,
				closeAfterTransition,
				/* Computed */
				positionClass,
				typeClass,
				transitionName,
			}
		}
	})
</script>