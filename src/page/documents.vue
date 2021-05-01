<template>
	<main class="documents">
		<PageHeader label="Mes documents" />
		<div v-if="show" class="documents__body" style="flex-direction: column;padding: 1rem;">
			<TabHeader v-model="searchDocument" icon="IconFilledWarning" searchable title="Documents"
			           @update:modelValue="onSearch" />
			<CustomForm class="documents__form">
				<CustomRow class="documents__form__row">
					<CustomEntriesNotFound v-if="!requiredDocuments.value.length" alt="Aucuns documents trouvés"
					                       label="Aucuns documents trouvés" />
					<DocumentUploadItem v-for="document in requiredDocuments.value" :key="document.key"
					                    :label="document.value" :user-documents="userDocuments.value" />
				</CustomRow>
			</CustomForm>
			<!--			<CustomTabs v-model="tab">
							<CustomTab icon="IconFilledWarning">Documents obligatoires</CustomTab>
							&lt;!&ndash;			  <CustomTab icon="IconCircleFilledPlus">Documents Facultatif</CustomTab>&ndash;&gt;
						</CustomTabs>
						<CustomTabItems v-model="tab">
							<CustomTabItem>
								<TabHeader v-model="searchDocument" icon="IconFilledWarning" searchable title="Documents obligatoires"
													 @update:modelValue="onSearch" />
								<CustomForm class="documents__form">
									<CustomRow class="documents__form__row">
										<CustomEntriesNotFound v-if="!requiredDocuments.value.length" label="Aucuns documents trouvés" alt="Aucuns documents trouvés" />
										<DocumentUploadItem v-for="document in requiredDocuments.value" :key="document.key"
																				:label="document.value" :user-documents="userDocuments.value" />
									</CustomRow>
								</CustomForm>
							</CustomTabItem>
							&lt;!&ndash;			  <CustomTabItem>
												2
											</CustomTabItem>&ndash;&gt;
						</CustomTabItems>-->
		</div>
		<div v-else class="page-loader">
			<CustomProgressCircle color="var(--color-blue-primary)" indeterminate />
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
	import { moveTawkToWidget, normalize } from "../utils"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "Documents",
		title: "Mes documents - Kistaff",
		setup: () => {
			const store = useStore()

			/* Datas */
			const show = ref(false)
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

				show.value = true
				moveTawkToWidget()
			})

			return {
				/* Datas */
				show,
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
