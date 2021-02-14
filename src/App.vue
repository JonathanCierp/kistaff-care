<template>
	<CoreHeader />
	<RouterView />
	<CoreFooter />
</template>

<script>
	import { defineComponent } from "vue"

	export default defineComponent({
		name: "App",
	})
</script>