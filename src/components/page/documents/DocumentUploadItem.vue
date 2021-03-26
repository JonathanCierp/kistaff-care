<template>
	<article class="document-upload-item">
		<div class="document-upload-item__body">
			<CustomRow class="document-upload-item__header" no-margin>
				<h2>{{ label }}</h2>
				<CustomRow center no-margin>
					<CustomButton v-if="userDocuments.length" icon-left="IconOutlinedEdit" size="sm"
					              @click="uploadDialogOpen = true">
						Mettre à jour
					</CustomButton>
					<CustomButton v-else icon-left="IconPlus" size="sm" @click="uploadDialogOpen = true">
						Ajouter
					</CustomButton>
				</CustomRow>
			</CustomRow>
			<div class="document-upload-item__separator"></div>
			<div class="document-upload-item__description">
				<p>Plus d'informations sur l'attestation de vigilance et comment la récupérer dans la FAQ</p>
			</div>
		</div>
	</article>
	<UploadDocumentDialog v-model="uploadDialogOpen" :label="label" :userDocuments="userDocuments" />
	<DeleteDocumentDialog v-model="deleteDialogOpen" :label="label" @delete-document="filename = null" />
</template>

<script>
	import { computed, defineComponent, ref } from "vue"

	export default defineComponent({
		name: "DocumentUploadItem",
		props: {
			label: {
				type: String,
				default: ""
			},
			userDocuments: {
				type: Array,
				default: []
			}
		},
		setup(props) {
			/* Datas */
			const input = ref(null)
			const filename = ref("")
			const uploadDialogOpen = ref(false)
			const deleteDialogOpen = ref(false)

			/* Computed */
			const userDocuments = computed(() => (props.userDocuments?.filter(userDocument => userDocument.Description === props.label)))

			return {
				/* Datas */
				input,
				filename,
				uploadDialogOpen,
				deleteDialogOpen,
				/* Computed */
				userDocuments
			}
		}
	})
</script>
