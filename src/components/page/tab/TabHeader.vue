<template>
	<h2 class="tabs-header">
		<component :is="icon"></component>
		{{ title }}
	</h2>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "TabsHeader",
		props: {
			title: {
				type: String,
				required: true
			},
			icon: {
				type: String,
				default: ""
			}
		}
  })
</script>