<template>
	<CustomDialog transition="slide-down" max-width="350px">
		<CustomDialogTitle label="Refuser la mission" @close="$emit('update:modelValue', false)" />
		<CustomDialogBody>
			Cette action ne peut être annulée !
		</CustomDialogBody>
		<CustomDialogActions>
			<CustomButton size="sm" text @click="$emit('update:modelValue', false)">Fermer</CustomButton>
			<CustomButton size="sm" type="error" @click="refuseMission" :loading="loading" :disabled="loading">Refuser</CustomButton>
		</CustomDialogActions>
	</CustomDialog>
</template>

<script>
	import { defineComponent, ref } from "vue"
  import { useStore } from "vuex"

	export default defineComponent({
    name: "RefuseMissionDialog",
		props: {
			mission: {
				type: Object,
				required: true
			}
		},
		emits: ["update:modelValue"],
		setup(props, { emit }) {
			const store = useStore()
			/* Datas */
			const loading = ref(false)
			/* Methods */
			const refuseMission = async () => {
				loading.value = true
				await store.dispatch("refuseMission", props.mission.id)
				loading.value = false

				emit("update:modelValue", false)
			}

			return {
				/* Datas */
				loading,
				/* Methods */
				refuseMission
			}
		}
  })
</script>