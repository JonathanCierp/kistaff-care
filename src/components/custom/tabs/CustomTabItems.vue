<template>
	<div ref="root" class="custom-tab-items" role="tablist">
		<slot />
	</div>
</template>

<script>
	import { defineComponent, onMounted, ref, watch } from "vue"

	export default defineComponent({
		name: "CustomTabItems",
		props: {
			modelValue: {
				type: [Number, String],
				default: 0
			}
		},
		setup: (props) => {
			/* Datas */
			const root = ref(null)

			/* Watchers */
			watch(() => props.modelValue, (newVal) => {
				let tabs = Array.from(root.value.children)
				tabs.forEach(tab => tab.classList.remove("custom-tab-item--active"))
				root.value.children[newVal]?.classList.add("custom-tab-item--active")
			})

			/* Lifecycle hooks */
			onMounted(() => {
				root.value.children[props.modelValue].classList.add("custom-tab-item--active")
			})

			return {
				/* Datas */
				root
			}
		}
	})
</script>