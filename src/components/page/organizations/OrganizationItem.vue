<template>
	<div class="organization-item">
		<div class="organization-item__section" @click="saveOrganization" :class="[selectedClass]">
			<h2>{{ organization.Account.Name }}</h2>
			<p>{{ fullAddress }}</p>
		</div>
	</div>
</template>

<script>
	import { computed, defineComponent, ref } from "vue"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "OrganizationItem",
		props: {
			organization: {
				type: Object,
				required: true
			}
		},
		setup(props) {
			const store = useStore()
			/* Datas */
			const selected = ref(props.organization.xStatus__c === "Accepted")
			/* Methods */
			const saveOrganization = () => {
				selected.value = !selected.value

				store.dispatch("saveOrganisation", {
					id: props.organization.Id,
					value: selected.value ? "Accepted" : "Suspended"
				})
			}
			/* Computed */
			const fullAddress = computed(() => {
				return `${props.organization.Account.BillingStreet}, ${props.organization.Account.BillingPostalCode} ${props.organization.Account.BillingCity}`
			})
			const selectedClass = computed(() => selected.value ? "organization-item__section--selected" : "")

			return {
				/* Datas */
				selected,
				/* Methods */
				saveOrganization,
				/* Computed */
				fullAddress,
				selectedClass
			}
		}
	})
</script>