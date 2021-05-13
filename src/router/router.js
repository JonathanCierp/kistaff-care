import { createWebHistory, createRouter } from "vue-router";
import routes from "./routes";
import { useAuth } from "../middleware/auth";
import store from "../store/store";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const isAuthenticated = await useAuth();
  const isAllowedNoConnected = to.meta.layout === "blank";

  if (isAuthenticated) {
    await getNotifications();
    setInterval(async () => await getNotifications(), 30000);
    
    if (isAllowedNoConnected) {
      return "/";
    }
  } else {
    if (!isAllowedNoConnected) {
      return "/auth/signin";
    }
  }

  return true;
});

const getNotifications = async () => {
  await store.dispatch("getNotifications");
};

export default router;
