<template>
  <div class="core-notification">
    <div class="core-notification__header">
      <h2 class="text-h5 font-medium">Notifications</h2>
      <CustomButton v-if="notifications.filter(notification => notification.show && notification.key !== 'document').length" size="sm" @click="onReadAllNotifications" :loading="loading">
        Marquer comme lu
      </CustomButton>
    </div>
    <ul class="core-notification__items">
      <CoreNotificationItem
        v-for="notification in notifications"
        :notification="notification"
      />
	    <CustomEntriesNotFound v-if="!notifications.filter(notification => notification.show).length" alt="Aucunes notifications"
	                           label="Aucunes notifications" size="150px" style="padding: 1rem 0;" />
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
import { defineComponent, ref } from "vue";
import { useStore } from "vuex"

export default defineComponent({
  name: "CoreNotification",
	props: {
		notifications: {
			type: Array,
			default: () => []
		}
	},
  setup: (props, { emit }) => {
  	const store = useStore()

	  const loading = ref(false)
    /* Methods */
    const onReadAllNotifications = async () => {
    	loading.value = true
      await store.dispatch("markAllNotificationAsRead")
	    loading.value = false
    };

    return {
	    loading,
      /* Methods */
	    onReadAllNotifications,
    };
  },
});
</script>
