<template>
  <article class="list-item">
    <div class="list-item__body">
	    <div class="list-item__meta">
		    <h2>{{ mission.job.name }}</h2>
		    <p>{{ previewPlace }}</p>
		    <div>
			    <p>{{ missionDate }}</p>
			    <p>{{ missionHours }}</p>
		    </div>
	    </div>
	    <div class="list-item__actions">
		    <CustomButton v-if="details" text type="info" block>Details</CustomButton>
		    <CustomButton v-if="confirm" text type="success" block>Accepter</CustomButton>
		    <CustomButton v-if="confirm" text type="error" block>Refuser</CustomButton>
	    </div>
    </div>
  </article>
</template>

<script>
	import { computed, defineComponent } from "vue"
	import { ucFirst } from "../../../utils"

	export default defineComponent({
    name: "ListItem",
		props: {
    	details: {
    		type: Boolean,
		    default: false
	    },
    	confirm: {
    		type: Boolean,
		    default: false
	    },
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