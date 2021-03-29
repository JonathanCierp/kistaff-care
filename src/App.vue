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
			const route = useRoute()

			/* Computed */
			const isDefaultLayout = computed(() => route.meta.layout === "default")

			/* Lifecycle Hooks */
			onMounted(async () => {
				if(localStorage.getItem("dark-theme") === "true") {
					document.body.classList.add("theme-dark")
				}
			})
			
			return {
				/* Computed */
				isDefaultLayout
			}
		}
	})
</script>
