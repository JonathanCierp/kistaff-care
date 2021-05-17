<template>
  <div class="core-notification">
    <div class="core-notification__header">
      <h2 class="text-h5 font-medium">Notifications</h2>
      <CustomButton size="sm" @click="onReadAllNotifications">
        Marquer comme lu
      </CustomButton>
    </div>
    <ul class="core-notification__items">
      <CoreNotificationItem
        v-for="notification in notifications"
        :notification="notification"
      />
    </ul>
    <!--<div class="core-notification__footer">
      <CustomLink
        to="/notifications"
        class="text-h5 font-medium"
        @click="onChangeRoute"
        >Toutes les notifications</CustomLink
      >
    </div>-->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex"

export default defineComponent({
  name: "CoreNotification",
  emits: ["change-route"],
  setup: (props, { emit }) => {
  	const store = useStore()

    /* Datas */
    const notifications = [
      {
        key: "document",
        title: "Des documents sont manquants, cliquez-ici pour en rajouter.",
        /*timeLabel: "Important",
        to: "/documents",
        status: "not_read",*/
      },
	    ...store.state.notifications
    ];

    /* Methods */
    const onReadAllNotifications = async () => {
      await store.dispatch("markAllNotificationAsRead")
    };

    return {
      /* Datas */
      notifications,
      /* Methods */
	    onReadAllNotifications,
    };
  },
});
</script>
