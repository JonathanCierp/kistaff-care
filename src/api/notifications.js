import store from "../store/store"
import { useAxiosAuthInstance } from "../plugins/axios";

const getNotifications = async () => {
  const { data } = await useAxiosAuthInstance().get("/notifications");

  return data.map(notification => normalizeNotification(notification))
};

const markAllNotificationAsRead = async (notificationId) => {
  await useAxiosAuthInstance().put(`/notifications/${notificationId}`, {
    xMarkAsRead__c: true
  });
};

const normalizeNotification = (notification) => {
  return  {
    key: notification.Id,
    title: notification.xTitle__c,
    description: notification.xMessage__c,
    isRead: notification.xMarkAsRead__c,
    /*timeLabel: "Important",*/
    /*to: "/documents",*/
    /*status: "not_read",*/
  }
};

export { getNotifications, markAllNotificationAsRead };
