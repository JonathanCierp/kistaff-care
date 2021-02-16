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
	import { defineComponent, ref } from "vue"

	export default defineComponent({
    name: "Documents",
		setup: () => {
			/* Datas */
			const tab = ref(0)

			return {
				/* Datas */
				tab
			}
		}
  })
</script>