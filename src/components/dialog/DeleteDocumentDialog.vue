<template>
	<CustomDialog max-width="350px" transition="slide-down">
		<CustomDialogTitle label="Supprimer le document" @close="$emit('update:modelValue', false)" />
		<CustomDialogBody>
			Cette action ne peut être annulée !
		</CustomDialogBody>
		<CustomDialogActions>
			<CustomButton size="sm" text @click="$emit('update:modelValue', false)">Fermer</CustomButton>
			<CustomButton :disabled="loading" :loading="loading" size="sm" type="error" @click="deleteDocument">Refuser
			</CustomButton>
		</CustomDialogActions>
	</CustomDialog>
</template>

<script>
	import { defineComponent, ref } from "vue"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "DeleteDocumentDialog",
		props: {
			label: {
				type: String,
				default: ""
			}
		},
		emits: ["deleteDocument", "update:modelValue"],
		setup(props, { emit }) {
			const store = useStore()
			/* Datas */
			const loading = ref(false)
			/* Methods */
			const deleteDocument = async () => {
				try {
					loading.value = true
					const userDocument = store.getters.getDocumentByDescription(props.label)
					await store.dispatch("deleteDocument", userDocument.Id)
					emit("deleteDocument")
					emit("update:modelValue", false)
				} finally {
					loading.value = false
				}
			}

			return {
				/* Datas */
				loading,
				/* Methods */
				deleteDocument
			}
		}
	})
</script>
