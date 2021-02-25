<template>
	<div class="list-item-confirm__meta">
		<h2>{{ mission.job.name }}</h2>
		<p>{{ previewPlace }}</p>
		<div>
			<p>{{ missionDate }}</p>
			<p>{{ missionHours }}</p>
		</div>
	</div>
	<div class="list-item-confirm__actions">
		<CustomButton text type="success" block>Accepter</CustomButton>
		<CustomButton text type="error" block>Refuser</CustomButton>
	</div>
</template>

<script>
	import { defineComponent, computed } from "vue"
	import { ucFirst } from "../../../utils"

	export default defineComponent({
    name: "ListItemConfirm",
		props: {
			mission: {
				type: Object,
				required: true
			}
		},
		setup: (props) => {
    	const startDate = new Date(props.mission.job.start_date)
    	const endDate = new Date(props.mission.job.end_date)
			const startDateFrFormat = startDate.toLocaleDateString("fr-FR", {
				weekday: "long",
				day: "numeric",
				month: "long"
			})
			const startHours = startDate.toLocaleTimeString().substr(0, 5);
			const endHours = endDate.toLocaleTimeString().substr(0, 5);

    	/* Computed */
			const previewPlace = computed(() => window.innerWidth >= 1100 ||  window.innerWidth <= 500 ? props.mission.organization.name.substr(0, 20) + "..." : "EHPAD La Maison Saint Charles Charles")
			const missionDate = computed(() => ucFirst(startDateFrFormat))
			const missionHours = computed(() => `${startHours} - ${endHours}`)

			return {
				/* Computed */
				previewPlace,
				missionDate,
				missionHours
			}
		}
  })
</script>