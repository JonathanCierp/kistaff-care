<template>
	<CoreHeader />
	<RouterView />
	<CoreFooter />
</template>

<script>
	import { defineComponent } from "vue"
	import CoreHeader from "./components/core/CoreHeader.vue"
	import CoreFooter from "./components/core/CoreFooter.vue"

	export default defineComponent({
		name: "App",
		components: {
			CoreHeader,
			CoreFooter
		}
	})
</script>