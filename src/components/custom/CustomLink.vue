<template>
	<component v-if="tag" :is="tag">
		<slot />
	</component>
	<router-link v-else :to="to">
		<slot />
	</router-link>
</template>

<script>
  import { defineComponent } from "vue"
  import { useRouter } from "vue-router"

	export default defineComponent({
    name: "CustomLink",
		props: {
			tag: {
				type: String,
				default: ""
			},
			to: {
				type: String,
				required: true
			}
		},
		setup: (props) => {
    	/* Constants */
    	const router = useRouter()

    	/* Methods */
			const onChangePage = () => {
				router.push(props.to)
			}
			
			return {
				/* Methods */
				onChangePage
			}
		}
  })
</script>