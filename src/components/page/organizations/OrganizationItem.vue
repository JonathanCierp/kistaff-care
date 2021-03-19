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

	export default defineComponent({
		name: "OrganizationItem",
		props: {
			organization: {
				type: Object,
				required: true
			}
		},
		setup(props) {
			/* Datas */
			const selected = ref(false)
			/* Methods */
			const saveOrganization = () => {
				selected.value = !selected.value
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