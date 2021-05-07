import store from "../store/store";
import { useAxiosAuthInstance } from "../plugins/axios";

/*const registerDevice = async (userId) => {
  return await store.dispatch("registerDevice", { userId });
};*/

const useAuth = async () => {
  try {
    if (!localStorage.getItem("jwt")) {
      return false;
    }

    const { data } = await useAxiosAuthInstance().get("/contacts");
    //await registerDevice(data[0].Id);

    store.commit("setUser", { user: data[0], isNew: true });
    store.commit("setIsLogged", true);
    setTimeout(function () {
      window.ReactNativeWebView
        ? window.ReactNativeWebView.postMessage(
            `${data[0].Id} ${localStorage.getItem("jwt")}`
          )
        : "";
    }, 2000);
  } catch (e) {
    return false;
  }

  return true;
};

export { useAuth };
