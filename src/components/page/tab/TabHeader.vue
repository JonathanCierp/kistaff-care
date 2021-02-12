<template>
	<h2 class="tabs-header">
		<component :is="icon"></component>
		Missions à pourvoir
	</h2>
</template>

<script>
  import { defineComponent } from "vue"
  import IconFilledCog from "../../icons/IconFilledCog.vue"

	export default defineComponent({
    name: "TabsHeader",
		components: {
			IconFilledCog
		},
		props: {
			icon: {
				type: String,
				default: ""
			}
		}
  })
</script>