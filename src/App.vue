<template>
  <CoreHeader v-if="isDefaultLayout" />
  <RouterView />
  <CoreFooter v-if="isDefaultLayout" />
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import firebaseMessaging from "./plugins/firebase"

export default defineComponent({
  name: "App",
  setup: () => {
    //provide("firebaseMessaging", firebaseMessaging)
    const route = useRoute();

    /* Computed */
    const isDefaultLayout = computed(() => route.meta.layout === "default");

    /* Lifecycle Hooks */
    onMounted(() => {
      if (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        localStorage.setItem("theme", "dark");
        document.body.classList.add("theme-dark");
      } else {
        localStorage.setItem("theme", "light");
        document.body.classList.remove("theme-dark");
      }

      firebaseMessaging.onMessage(payload => {
				alert("Message received.")
			})
    });

    return {
      /* Computed */
      isDefaultLayout,
    };
  },
});
</script>
