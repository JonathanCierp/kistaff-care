<template>
	<main class="missions">
		<PageHeader label="Mes missions" />
		<div v-if="show" class="missions__body">
			<CustomTabs v-model="tab">
				<CustomTab icon="IconFilledCog">
					A pourvoir&nbsp;<sub class="hide-on-mobile text-caption">({{ newMissions.value.length }})</sub>
				</CustomTab>
				<CustomTab icon="IconFilledCog">
					En cours&nbsp;<sub class="hide-on-mobile text-caption">({{ upcomingMissions.value.length }})</sub>
				</CustomTab>
				<CustomTab icon="IconFilledCog">
					En attente&nbsp;<sub class="hide-on-mobile text-caption">({{ pendingMissions.value.length }})</sub>
				</CustomTab>
				<CustomTab icon="IconFilledCog">
					Passées&nbsp;<sub class="hide-on-mobile text-caption">({{ passedMissions.value.length }})</sub>
				</CustomTab>
			</CustomTabs>
			<CustomTabItems v-model="tab">
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions à pourvoir" />
					<ListItems>
						<ListItem v-for="mission in newMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-confirm" confirm />
					</ListItems>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions en cours" />
					<ListItems>
						<ListItem v-for="mission in upcomingMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-details" details />
					</ListItems>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions en attente" />
					<ListItems>
						<ListItem v-for="mission in pendingMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-details" details />
					</ListItems>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions passées" />
					<ListItems>
						<ListItem v-for="mission in passedMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-details" details />
					</ListItems>
				</CustomTabItem>
			</CustomTabItems>
		</div>
	</main>
</template>

<script>
	import { defineComponent, onMounted, reactive, ref, computed } from "vue"
	import {
		MISSIONS_STATUS,
		findMissionsForUserConnected,
		findRequestsForUserConnected,
		findMissionsForUserConnectedFilteredByStatus
	} from "../api/missions"

	export default defineComponent({
		name: "Home",
		setup: () => {
			/* Datas */
			const show = ref(false)
			const tab = ref(0)
			let newMissions = reactive([{}])
			let upcomingMissions = reactive([{}])
			let pendingMissions = reactive([{}])
			let passedMissions = reactive([{}])

			/* Lifecycle hooks*/
			onMounted(async () => {
				await findMissionsForUserConnected()
				await findRequestsForUserConnected()

				newMissions.value = await findMissionsForUserConnectedFilteredByStatus(MISSIONS_STATUS.NEW)
				upcomingMissions.value = await findMissionsForUserConnectedFilteredByStatus(MISSIONS_STATUS.UPCOMING)
				pendingMissions.value = await findMissionsForUserConnectedFilteredByStatus(MISSIONS_STATUS.PENDING)
				passedMissions.value = await findMissionsForUserConnectedFilteredByStatus(MISSIONS_STATUS.PASSED)

				show.value = true
			})

			return {
				/* Datas */
				show,
				tab,
				newMissions,
				upcomingMissions,
				pendingMissions,
				passedMissions
			}
		}
	})
</script>