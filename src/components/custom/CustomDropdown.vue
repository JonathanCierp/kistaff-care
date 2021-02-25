<template>
	<div ref="root" class="custom-dropdown" :data-uid="uid">
		<custom-button v-if="$slots.title" class="custom-dropdown__title" :icon="icon" :text="text" @click="onOpen" :center="center" block :icon-left="iconLeft">
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
			iconLeft: {
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
				popoverTop.value = root.value.offsetHeight
				open.value = !open.value

				if(open.value) {
					document.querySelector("html").addEventListener("click", closeDropdown)
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
				let styles = {
					top: (popoverTop.value + parseInt(props.offset)) + "px"
				}

				if(props.popoverWidth) {
					styles = {...styles, width: props.popoverWidth}
				}

				return styles
			})

			return {
				/* Datas */
				root,
				open,
				uid,
				/* Methods */
				onOpen,
				closeDropdown,
				/* Computed */
				popoverStyle
			}
		}
	})
</script>