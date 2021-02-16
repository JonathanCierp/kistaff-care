<template>
	<CoreHeader v-if="isDefaultLayout" />
	<RouterView />
	<CoreFooter v-if="isDefaultLayout" />
</template>

<script>
	import { defineComponent, computed } from "vue"
	import { useRoute } from "vue-router"

	export default defineComponent({
		name: "App",
		setup: () => {
			const route = useRoute()
			/* Computed */
			const isDefaultLayout = computed(() => route.meta.layout === "default")

			return {
				/* Computed */
				isDefaultLayout
			}
		}
	})
</script>