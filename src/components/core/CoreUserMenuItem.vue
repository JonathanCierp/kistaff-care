
<template>
	<li v-if="link.to">
		<CustomLink :to="link.to">
			<component :is="link.icon" />
			{{ link.label }}
		</CustomLink>
	</li>
	<li v-else @click="link.callback">
		<CustomButton icon>
			<component :is="link.icon" />
			{{ link.label }}
		</CustomButton>
	</li>
</template>

<script>
	import { defineComponent } from "vue"

	export default defineComponent({
		name: "CoreUserMenuItem",
		props: {
			link: {
				type: Object,
				required: true
			}
		}
	})
</script>