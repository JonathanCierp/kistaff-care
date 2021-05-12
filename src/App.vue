<template>
  <CoreHeader v-if="isDefaultLayout" />
  <RouterView />
  <CoreFooter v-if="isDefaultLayout" />
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
//import firebaseMessaging from "./plugins/firebase"

export default defineComponent({
  name: "App",
  setup: () => {
    /*if(navigator.userAgent.match(/Windows/i) === "Windows") {
      provide("firebaseMessaging", firebaseMessaging)
    }*/
    const route = useRoute();
    const store = useStore();

    const getNotifications = async () => {
	    await store.dispatch("getNotifications")
    }

    /* Computed */
    const isDefaultLayout = computed(() => route.meta.layout === "default");

    /* Lifecycle Hooks */
    onMounted(async () => {
	    await getNotifications()
			setInterval(async () => await getNotifications(), 30000)

      if (localStorage.getItem("theme") === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        localStorage.setItem("theme", "dark");
        document.body.classList.add("theme-dark");
      } else {
        localStorage.setItem("theme", "light");
        document.body.classList.remove("theme-dark");
      }
      

      /*if(navigator.userAgent.match(/Windows/i) === "Windows") {
        firebaseMessaging.onMessage(payload => {
          alert("Message received.")
        })
      }*/
    });

    return {
      /* Computed */
      isDefaultLayout,
    };
  },
});
</script>
