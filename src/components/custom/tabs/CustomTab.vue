<template>
  <div class="custom-tab" :data-uid="uid">
	  <component :is="icon" />
    <slot></slot>
  </div>
</template>

<script>
	import { defineComponent, ref } from "vue"
	import { getUid } from "../../../utils"
  import IconFilledCog from "../../icons/IconFilledCog.vue"
  import IconCircleOutlineUser from "../../icons/IconCircleOutlineUser.vue"

	export default defineComponent({
    name: "CustomTab",
		components: {
			IconFilledCog,
			IconCircleOutlineUser
		},
		props: {
			icon: {
				type: String,
				default: ""
			}
		},
		setup: () => {
			/* Datas */
			const uid = ref(getUid())

			return {
				/* Datas */
				uid
			}
		}
  })
</script>