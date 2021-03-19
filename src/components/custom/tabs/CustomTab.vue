<template>
  <div class="custom-tab" :data-uid="uid" :data-tab="name">
	  <component :is="icon" />
    <slot></slot>
  </div>
</template>

<script>
	import { defineComponent, ref } from "vue"
	import { getUid } from "../../../utils"

	export default defineComponent({
    name: "CustomTab",
		props: {
			icon: {
				type: String,
				default: ""
			},
			name: {
				type: [Number, String],
				default: null
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