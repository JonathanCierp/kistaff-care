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
	import CustomLink from "../custom/CustomLink.vue"
	import CustomButton from "../custom/CustomButton.vue"
	import IconCircleOutlineUser from "../icons/IconCircleOutlineUser.vue"
	import IconOutlinedDocument from "../icons/IconOutlinedDocument.vue"
	import IconOutlinedLogout from "../icons/IconOutlinedLogout.vue"

	export default defineComponent({
		name: "CoreUserMenuItem",
		components: {
			CustomLink,
			CustomButton,
			IconCircleOutlineUser,
			IconOutlinedDocument,
			IconOutlinedLogout
		},
		props: {
			link: {
				type: Object,
				required: true
			}
		}
	})
</script>