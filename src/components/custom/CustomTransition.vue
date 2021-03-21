<template>
	<transition :name="nameTransition" :duration="175">
		<slot v-if="show" />
	</transition>
</template>

<script>
	import { computed, defineComponent, onMounted, ref } from "vue"

	export default defineComponent({
		name: "CustomTransition",
		props: {
			name: {
				type: String,
				default: "fade"
			},
			delay: {
				type: [String, Number],
				default: 0
			}
		},
		setup(props) {
			/* Datas */
			const show = ref(false)

			/* Computed */
			const nameTransition = computed(() => "custom-transition--" + props.name)

			/* Lifecycle hooks */
			onMounted(() => {
				setTimeout(() => {
					show.value = true
				}, props.delay)
			})

			return {
				/* Datas */
				show,
				/* Computed */
				nameTransition
			}
		}
	})
</script>