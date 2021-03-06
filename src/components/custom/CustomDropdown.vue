<template>
	<div ref="root" class="custom-dropdown" :data-uid="uid" :class="[placementClass, disabledClass]">
		<custom-button v-if="$slots.title" class="custom-dropdown__title" :icon="icon" :text="text" @click="onOpen" :center="center" block :icon-right="iconRight">
			<slot name="title"></slot>
		</custom-button>
		<transition name="fade">
			<div class="custom-dropdown__popover" v-if="open" :style="[popoverStyle]">
				<slot name="popover"></slot>
			</div>
		</transition>
	</div>
</template>

<script>
	import { computed, defineComponent, ref } from "vue"
	import { getUid } from "../../utils"

	export default defineComponent({
		name: "CustomDropdown",
		props: {
			text: {
				type: Boolean,
				default: false
			},
			icon: {
				type: Boolean,
				default: false
			},
			iconRight: {
				type: String,
				default: ""
			},
			offset: {
				type: [Number, String],
				default: 8
			},
			popoverWidth: {
				type: String,
				default: ""
			},
			center: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			placement: {
				type: String,
				default: "bottom"
			}
		},
		setup: (props) => {
			/* Constants */
			const popoverTop = ref(0)

			/* Datas */
			const root = ref(null)
			const open = ref(false)
			const uid = ref(getUid())

			/* Methods */
			const onOpen = () => {
				if(!props.disabled) {
					popoverTop.value = root.value.offsetHeight
					open.value = !open.value

					if(open.value) {
						document.querySelector("html").addEventListener("click", closeDropdown)
					}
				}
			}

			const closeDropdown = (e) => {
				if(!e || !e.target.closest(".custom-dropdown") || e.target.closest(".custom-dropdown").getAttribute("data-uid") !== uid.value) {
					open.value = false
					document.querySelector("html").removeEventListener("click", closeDropdown)
				}
			}

			/* Computed */
			const popoverStyle = computed(() => {
				let styles = { }

				if(props.placement === "top") {
					styles = {
						bottom: `calc(100% + ${parseInt(props.offset)}px)`
					}
				}else if(props.placement === "bottom") {
					styles = {
						top: `calc(100% + ${parseInt(props.offset)}px)`
					}
				}

				if(props.popoverWidth) {
					styles = {...styles, width: props.popoverWidth}
				}

				return styles
			})
			const disabledClass = computed(() => props.disabled? `custom-dropdown--disabled` : "")
			const placementClass = computed(() => `custom-dropdown--${props.placement}`)

			return {
				/* Datas */
				root,
				open,
				uid,
				/* Methods */
				onOpen,
				closeDropdown,
				/* Computed */
				popoverStyle,
				disabledClass,
				placementClass
			}
		}
	})
</script>
