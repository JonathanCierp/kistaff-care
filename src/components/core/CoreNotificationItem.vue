<template>
	<li class="core-notification-item" :class="notification.class" @click="onChangeRoute">
		<h2 class="font-regular">{{ notification.title }}</h2>
		<p>{{ notification.description }}</p>
		<!--			<span class="font-medium">{{ notification.timeLabel }}</span>-->
	</li>
</template>

<script>
	import { defineComponent } from "vue"
	import { useRouter } from "vue-router"

	export default defineComponent({
		name: "CoreNotification",
		props: {
			notification: {
				type: Object,
				required: true
			}
		},
		setup: (props) => {
			const router = useRouter()
			/* Methods */
			const onChangeRoute = () => {
				if(props.notification.to) {
					router.push(props.notification.to)
				}
			}

			return {
				/* Methods */
				onChangeRoute
			}
		}
	})
</script>
