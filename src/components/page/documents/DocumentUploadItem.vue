<template>
  <article class="document-upload-item">
		<div class="document-upload-item__body">
			<CustomRow class="document-upload-item__header" no-margin>
				<h2>{{ label }}</h2>
				<CustomRow center no-margin>
					<CustomButton v-if="!(filename || userDocument?.Name)" size="sm" @click="uploadDialogOpen = true" icon-left="IconPlus">
						Ajouter
					</CustomButton>
					<CustomButton v-if="filename || userDocument?.Name" size="sm" @click="uploadDialogOpen = true" icon-left="IconOutlinedEdit">
						Mettre à jour
					</CustomButton>
					<CustomButton v-if="filename || userDocument?.Name" size="sm" type="error" text @click="deleteDialogOpen = true">
						<IconTrash />
					</CustomButton>
				</CustomRow>
			</CustomRow>
			<div class="document-upload-item__separator"></div>
			<div v-if="filename || userDocument?.Name" class="document-upload-item__file">
				<span>{{ filename || userDocument?.Name }}</span>
			</div>
			<div v-else class="document-upload-item__description">
				<p>Plus d'informations sur l'attestation de vigilance et comment la récupérer dans la FAQ</p>
			</div>
		</div>
  </article>
	<UploadDocumentDialog v-model="uploadDialogOpen" v-model:filename="filename" :label="label" />
	<DeleteDocumentDialog v-model="deleteDialogOpen" :label="label" @delete-document="filename = null" />
</template>

<script>
	import { computed, defineComponent, ref } from "vue"
	import { normalize } from "../../../utils"

	export default defineComponent({
    name: "DocumentUploadItem",
		props: {
    	label: {
    		type: String,
		    default: ""
	    },
			userDocuments: {
				type: Object,
				default: () => {}
			}
		},
		setup(props) {
    	/* Datas */
			const input = ref(null)
			const filename = ref(null)
			const uploadDialogOpen = ref(false)
			const deleteDialogOpen = ref(false)

			/* Computed */
			const userDocument = computed(() => (props.userDocuments?.find(userDocument => userDocument.Description === props.label)))

    	return {
    		/* Datas */
		    input,
		    filename,
		    uploadDialogOpen,
		    deleteDialogOpen,
		    /* Computed */
		    userDocument
	    }
		}
  })
</script>