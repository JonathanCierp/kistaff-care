<template>
	<form class="custom-form">
		<slot />
	</form>
</template>

<script>
	import { defineComponent } from "vue"

	export default defineComponent({
		name: "CustomForm"
	})
</script>