<template>
	<li class="core-notification-item">
		<h2 class="font-regular">{{ notification.title }}</h2>
		<p>{{ notification.description }}</p>
		<!--			<span class="font-medium">{{ notification.timeLabel }}</span>-->
	</li>
</template>

<script>
	import { defineComponent } from "vue"

	export default defineComponent({
		name: "CoreNotification",
		props: {
			notification: {
				type: Object,
				required: true
			}
		},
		emits: ["change-route"],
		setup: (props, { emit }) => {
			/* Methods */
			const onChangeRoute = () => {
				emit("change-route")
			}

			return {
				/* Methods */
				onChangeRoute
			}
		}
	})
</script>
