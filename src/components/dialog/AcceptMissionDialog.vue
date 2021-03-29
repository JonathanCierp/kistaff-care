<template>
	<CustomDialog max-width="500px" transition="slide-down">
		<CustomDialogTitle label="Accepter une mision" @close="$emit('update:modelValue', false)" />
		<CustomDialogBody>
			<h3 class="font-medium text-h5">{{ mission.organization.name }}</h3>
			<br>
			<div class="my-2">
				<p class="font-medium text-body-1">Profil recherché : </p>
				<p class="my-1 ml-1">{{ mission.job.name }}</p>
			</div>
			<div class="my-2">
				<p class="font-medium text-body-1">Date : </p>
				<p class="my-1 ml-1" v-html="missionDate" />
			</div>
			<div class="my-2">
				<p class="font-medium text-body-1">Adresse : </p>
				<a class="my-1 ml-1" :href="organizationMapsUrl" target="_blank">{{ mission.organization.address }}</a>
			</div>
			<div class="flex items-center mt-4 text-red-primary text-body-2" v-if="!mission.documentReceived">
				<div>
					<IconWarning class="mr-2" />
				</div>
				<span>
					Vos documents ne sont pas à jour, vous ne pouvez pas accepter cette mission.
					<a class="font-medium italic" href="/documents">Cliquez ici</a> pour les mettre à jours.
				</span>
			</div>
		</CustomDialogBody>
		<CustomDialogActions>
			<CustomButton size="sm" text @click="$emit('update:modelValue', false)">Fermer</CustomButton>
			<CustomButton :disabled="loading || !mission.documentReceived" :loading="loading" size="sm" type="success" @click="acceptMission">Accepter
			</CustomButton>
		</CustomDialogActions>
	</CustomDialog>
</template>

<script>
	import { computed, defineComponent, ref } from "vue"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "AcceptMissionDialog",
		props: {
			mission: {
				type: Object,
				required: true
			}
		},
		setup(props, { emit }) {
			const store = useStore()
			/* Datas */
			const loading = ref(false)

			/* Methods */
			const acceptMission = async () => {
				loading.value = true
				await store.dispatch("acceptMission", props.mission.id)
				loading.value = false

				emit("update:modelValue", false)
			}

			/* Computed*/
			const missionDate = computed(() => {
				const startDate = new Date(props.mission.job.start_date)
				const endDate = new Date(props.mission.job.end_date)
				const startDateLitteral = startDate.toLocaleDateString("fr-FR", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric"
				})
				let startHours = startDate.toLocaleTimeString().substr(0, 5)
				let endHours = endDate.toLocaleTimeString().substr(0, 5)

				return `Le
					<span class="font-medium">${startDateLitteral}</span> de
					<span class="font-medium">${startHours}</span> jusqu'a
					<span class="font-medium">${endHours}</span>.
				`
			})
			const organizationMapsUrl = computed(() => `https://www.google.com/maps?q=${props.mission.organization.address}`)

			return {
				/* Datas */
				loading,
				/* Methods */
				acceptMission,
				/* Computed*/
				missionDate,
				organizationMapsUrl
			}
		}
	})
</script>
