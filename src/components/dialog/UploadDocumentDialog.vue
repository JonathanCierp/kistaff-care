<template>
	<CustomDialog max-width="450px" transition="slide-down">
		<CustomDialogTitle :label="label" @close="$emit('update:modelValue', false)" />
		<CustomDialogBody>
			<p class="text-body-2">Plus d'informations sur l'attestation de vigilance et comment la récupérer dans la FAQ</p>
			<CustomFileUpload v-model="file" />
		</CustomDialogBody>
		<CustomDialogActions>
			<CustomButton size="sm" text @click="$emit('update:modelValue', false)">Fermer</CustomButton>
			<CustomButton :disabled="loading" :loading="loading" size="sm" @click="uploadDocument">
				Télécharger
			</CustomButton>
		</CustomDialogActions>
	</CustomDialog>
</template>

<script>
	import { defineComponent, onMounted, ref } from "vue"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "UploadDocumentDialog",
		props: {
			label: {
				type: String,
				default: ""
			},
			filename: {
				type: String,
				default: ""
			}
		},
		setup(props, { emit }) {
			const store = useStore()

			/* Datas */
			const loading = ref(false)
			const file = ref({})

			/* Methods */
			const uploadDocument = () => {
				loading.value = true
				let reader = new FileReader()
				reader.readAsDataURL(file.value)
				reader.onload = async () => {
					const document = {
						Name: props.label + "-" + file.value.name, // Adeli-azoejkdpaoiezjfp
						ParentId: store.state.user.Id, // User id
						ContentType: file.value.type, // extension
						Description: props.label, // Type de doc
						Body: reader.result.replace(/^data:.+;base64,/, "") // Encoder b64
					}
					try {
						const userDocument = store.getters.getDocumentByDescription(props.label)
						await store.dispatch("uploadDocument", { document, userDocument })
						emit("update:filename", document.Name)
						emit("update:modelValue", false)
					} catch(e) {

					}
					loading.value = false
				}

			}

			return {
				/* Datas */
				loading,
				file,
				/* Methods */
				uploadDocument
			}
		}
	})
</script>