<template>
  <div class="core-notification">
		<div class="core-notification__header">
			<h2 class="text-h5 font-medium">Notification</h2>
			<CustomLink to="/settings#preferences" @click="onChangeRoute">
				<IconFilledCog />
			</CustomLink>
		</div>
		<ul class="core-notification__items">
			<CoreNotificationItem v-for="notification in notifications" :notification="notification" @click="onChangeRoute" />
		</ul>
		<div class="core-notification__footer">
			<CustomLink to="/notifications" class="text-h5 font-medium" @click="onChangeRoute">Toutes les notifications</CustomLink>
		</div>
  </div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "CoreNotification",
		setup: (props, { emit }) => {
    	/* Datas */
			const notifications = [
				{
					key: "mission-1",
					title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
					timeLabel: "Il y a 1 heure",
					to: "/missions/1"
				},
				{
					key: "mission-2",
					title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
					timeLabel: "Il y a 1 heure",
					to: "/missions/2"
				},
				{
					key: "mission-3",
					title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
					timeLabel: "Il y a 1 heure",
					to: "/missions/3"
				},
				{
					key: "mission-4",
					title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
					timeLabel: "Il y a 1 heure",
					to: "/missions/4"
				}
			]

			/* Methods */
			const onChangeRoute = () => {
				emit("change-route")
			}

			return {
				/* Datas */
				notifications,
				/* Methods */
				onChangeRoute
			}
		}
  })
</script>