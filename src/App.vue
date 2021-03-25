<template>
	<CoreHeader v-if="isDefaultLayout" />
	<RouterView />
	<CoreFooter v-if="isDefaultLayout" />
</template>

<script>
	import { computed, defineComponent, onMounted, provide } from "vue"
	import { useRoute } from "vue-router"
	import firebaseMessaging from "./plugins/firebase"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "App",
		setup: () => {
			provide("firebaseMessaging", firebaseMessaging)

			const store = useStore()
			const route = useRoute()
			/* Computed */
			const isDefaultLayout = computed(() => route.meta.layout === "default")

			/* Lifecycle Hooks */
			onMounted(async () => {
				//await store.dispatch("registerDevice", { userId: store.state.user.Id })
			})
			
			return {
				/* Computed */
				isDefaultLayout
			}
		}
	})
</script>
