<template>
  <main class="documents">
	  <PageHeader label="Mes documents" />
	  <div class="documents__body">
		  <CustomTabs v-model="tab">
			  <CustomTab icon="IconFilledWarning">Documents obligatoires</CustomTab>
			  <CustomTab icon="IconCircleFilledPlus">Documents Facultatif</CustomTab>
		  </CustomTabs>
		  <CustomTabItems v-model="tab">
			  <CustomTabItem>
				  1
			  </CustomTabItem>
			  <CustomTabItem>
				  2
			  </CustomTabItem>
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

	export default defineComponent({
    name: "Documents",
		setup: () => {
			/* Datas */
			const tab = ref(0)
			const requiredDocuments = reactive({})

			/* Lifecycle Hooks */
			onMounted(async () => {
				await findSobjectsForUserConnected()

				requiredDocuments.value = await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.DOCUMENT)
			})

			return {
				/* Datas */
				tab,
				requiredDocuments
			}
		}
  })
</script>