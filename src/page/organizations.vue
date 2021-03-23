<template>
	<main class="organizations">
		<PageHeader label="Mes établissements" />
		<div v-if="show" class="organizations__body">
			<TabHeader title="Établissements" v-model="searchOrganization" searchable @update:modelValue="onSearch" />
			<div class="organizations__items">
				<CustomEntriesNotFound v-if="!organizations.value.length" label="Aucuns établissements trouvés" alt="Aucuns établissements trouvés" />
				<OrganizationItem v-for="organization in organizations.value" :key="organization.Id"
				                  :organization="organization" />
			</div>
		</div>
		<div v-else class="page-loader">
			<CustomProgressCircle color="var(--color-blue-primary)" indeterminate />
		</div>
	</main>
</template>

<script>
	import { defineComponent, onMounted, reactive, ref } from "vue"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "Organizations",
		setup: () => {
			const store = useStore()
			/* Datas */
			const show = ref(false)
			const searchOrganization = ref("")
			const organizations = reactive([])
			/* Methods */
			const onSearch = (v) => {
				organizations.value = store.getters.filterOrganization(v)
			}
			/* Lifecycle hooks */
			onMounted(async () => {
				await store.dispatch("getOrganizations")

				organizations.value = store.getters.filterOrganization()
				show.value = true
			})

			return {
				/* Datas */
				show,
				organizations,
				searchOrganization,
				/* Methods */
				onSearch
			}
		}
	})
</script>