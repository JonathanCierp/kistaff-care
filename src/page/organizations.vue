<template>
	<main class="organizations">
		<PageHeader label="Mes établissements" />
		<div class="organizations__body">
			<TabHeader v-model="searchOrganization" searchable @update:modelValue="onSearch" />
			<div class="organizations__items">
				<OrganizationItem v-for="organization in organizations.value" :key="organization.Id"
				                  :organization="organization" />
			</div>
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
			})

			return {
				/* Datas */
				organizations,
				searchOrganization,
				/* Methods */
				onSearch
			}
		}
	})
</script>