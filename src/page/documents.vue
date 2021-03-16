<template>
	<main class="documents">
		<PageHeader label="Mes documents" />
		<div class="documents__body">
			<CustomTabs v-model="tab">
				<CustomTab icon="IconFilledWarning">Documents obligatoires</CustomTab>
				<!--			  <CustomTab icon="IconCircleFilledPlus">Documents Facultatif</CustomTab>-->
			</CustomTabs>
			<CustomTabItems v-model="tab">
				<CustomTabItem>
					<TabHeader v-model="searchDocument" icon="IconFilledWarning" searchable title="Documents obligatoires"
					           @update:modelValue="onSearch" />
					<CustomForm class="documents__form">
						<CustomRow class="documents__form__row">
							<DocumentUploadItem v-for="document in requiredDocuments.value" :key="document.key"
							                    :label="document.value" :user-documents="userDocuments.value" />
						</CustomRow>
					</CustomForm>
				</CustomTabItem>
				<!--			  <CustomTabItem>
									2
								</CustomTabItem>-->
			</CustomTabItems>
		</div>
	</main>
</template>

<script>
	import { defineComponent, onMounted, reactive, ref } from "vue"
	import {
		findSobjectsForUserConnected,
		findSobjectsForUserConnectedFilteredByField,
		SOBJECTS_FIELD
	} from "../api/sobjects"
	import { normalize } from "../utils"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "Documents",
		setup: () => {
			const store = useStore()

			/* Datas */
			const tab = ref(0)
			const requiredDocuments = reactive([])
			const userDocuments = reactive([])
			const openModalDocument = ref(false)
			const searchDocument = ref("")

			/* Methods */
			const onSearch = async v => {
				if(v) {
					requiredDocuments.value = (await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.DOCUMENT))
							.filter(document => normalize(document.value).includes(normalize(v)))
				} else {
					requiredDocuments.value = await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.DOCUMENT)
				}
			}

			/* Lifecycle Hooks */
			onMounted(async () => {
				await store.dispatch("getUserDocument")
				await findSobjectsForUserConnected()
				requiredDocuments.value = await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.DOCUMENT)
				
				userDocuments.value = store.state.userDocuments
			})

			return {
				/* Datas */
				tab,
				requiredDocuments,
				userDocuments,
				openModalDocument,
				searchDocument,
				/* Methods */
				onSearch
			}
		}
	})
</script>