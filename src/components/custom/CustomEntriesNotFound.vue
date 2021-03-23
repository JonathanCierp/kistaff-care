<template>
	<div class="custom-entries-not-found">
		<img :alt="alt" src="/img/missions-not-found.svg">
		<h3 class="text-h5 font-medium">{{ label }}</h3>
	</div>
</template>

<script>
	import { defineComponent } from "vue"

	export default defineComponent({
		name: "CustomEntriesNotFound",
		props: {
			label: {
				type: String,
				required: true
			},
			alt: {
				type: String,
				required: true
			}
		}
	})
</script>