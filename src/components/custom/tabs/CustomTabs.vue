<template>
  <div ref="root" class="custom-tabs" @click="onChangeTabs">
    <slot />
  </div>
</template>

<script>
  import { defineComponent, ref, onMounted } from "vue"

	export default defineComponent({
    name: "CustomTabs",
		props: {
    	modelValue: {
    		type: [Number, String],
		    default: 0
	    }
		},
		setup: (props, { emit }) => {
			/* Datas */
    	const root = ref(null)

    	/* Methods */
			const onChangeTabs = (e) => {
				let tabs = Array.from(root.value.children)
				let element = e.target.closest(".custom-tab")

				if(element) {
					tabs.forEach(tab => tab.classList.remove("custom-tab--active"))
					element.classList.add("custom-tab--active")

					emit("update:modelValue", element.getAttribute("data-tab") || tabs.indexOf(element))
				}
			}
			
			/* Lifecycle hooks */
			onMounted(() => {
				if(typeof props.modelValue === "number") {
					root.value.children[props.modelValue]?.classList.add("custom-tab--active")
				}else {
					[...root.value.children].find(child => child.getAttribute("data-tab") === props.modelValue)?.classList.add("custom-tab--active")
				}
			})

			return {
				/* Datas */
				root,
				/* Methods */
				onChangeTabs
			}
		}
  })
</script>