<template>
	<div ref="root" class="custom-dropdown" :data-uid="uid">
		<custom-button class="custom-dropdown__title" :icon="icon" @click="onOpen">
			<slot name="title"></slot>
		</custom-button>
		<transition name="fade">
			<div class="custom-dropdown__popover" v-if="open" :style="[popoverLeftStyle]">
				<slot name="popover"></slot>
			</div>
		</transition>
	</div>
</template>

<script>
	import { computed, defineComponent, ref, onMounted } from "vue"
	import { getUid } from "../../utils"
	import CustomButton from "./CustomButton.vue"

	export default defineComponent({
		name: "CustomDropdown",
		components: {
			CustomButton
		},
		props: {
			icon: {
				type: Boolean,
				default: false
			}
		},
		setup: () => {
			/* Constants */
			const popoverLeft = ref(0)
			const popoverTop = ref(0)

			/* Datas */
			const root = ref(null)
			const open = ref(false)
			const uid = ref(getUid())

			/* Methods */
			const onOpen = () => {
				popoverLeft.value = root.value.offsetWidth
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
			const popoverLeftStyle = computed(() => {
				return {
					left: popoverLeft.value + "px",
					top: (popoverTop.value + 8) + "px"
				}
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
				popoverLeftStyle
			}
		}
	})
</script>