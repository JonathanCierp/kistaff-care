<template>
	<core-header />
	<router-view />
</template>

<script>
	import { defineComponent } from "vue"
	import CoreHeader from "./components/core/CoreHeader.vue"

	export default defineComponent({
		name: "App",
		components: {
			CoreHeader
		}
	})
</script>