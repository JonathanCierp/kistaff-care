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
				if(typeof newVal === "number") {
					root.value.children[newVal]?.classList.add("custom-tab-item--active")
				}else {
					[...root.value.children].find(child => child.getAttribute("data-tab") === newVal)?.classList.add("custom-tab-item--active")
				}
			})

			/* Lifecycle hooks */
			onMounted(() => {
				if(typeof props.modelValue === "number") {
					root.value.children[props.modelValue]?.classList.add("custom-tab-item--active")
				}else {
					[...root.value.children].find(child => child.getAttribute("data-tab") === props.modelValue)?.classList.add("custom-tab-item--active")
				}
			})

			return {
				/* Datas */
				root
			}
		}
	})
</script>