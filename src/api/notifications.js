import { useAxiosAuthInstance } from "../plugins/axios";

const getNotifications = async () => {
  const { data } = await useAxiosAuthInstance().get("/notifications");

  return data.map(notification => normalizeNotification(notification))
};

const markNotificationAsRead = async () => {};

const normalizeNotification = (notification) => {
  return  {
    key: notification.Id,
    title: notification.xTitle__c,
    description: notification.xMessage__c,
    /*timeLabel: "Important",*/
    /*to: "/documents",*/
    /*status: "not_read",*/
  }
};

export { getNotifications, markNotificationAsRead };
