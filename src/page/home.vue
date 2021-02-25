<template>
	<main class="missions">
		<PageHeader label="Mes missions" />
		<div class="missions__body">
			<CustomTabs v-model="tab">
				<CustomTab icon="IconFilledCog">A pourvoir&nbsp;<sub class="hide-on-mobile text-caption">({{
						newMissionLength
					}})</sub></CustomTab>
				<CustomTab icon="IconFilledCog">En cours&nbsp;<sub class="hide-on-mobile text-caption">({{
						upcomingMissionLength
					}})</sub></CustomTab>
				<CustomTab icon="IconFilledCog">En attente&nbsp;<sub
						class="hide-on-mobile text-caption">({{ pendingMissionLength }})</sub></CustomTab>
				<CustomTab icon="IconFilledCog">Passées&nbsp;<sub class="hide-on-mobile text-caption">({{
						passedMissionsLength
					}})</sub></CustomTab>
			</CustomTabs>
			<CustomTabItems v-model="tab">
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions à pourvoir" />
					<ListItems>
						<ListItem v-for="newMission in newMissions.value" :key="newMission.id" class="list-item-confirm">
							<ListItemConfirm :mission="newMission" />
						</ListItem>
					</ListItems>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions en cours" />
					<!--					<ListItems>
											<ListItem class="list-item-details" >
												<ListItemDetails />
											</ListItem>
											<ListItem class="list-item-details" >
												<ListItemDetails />
											</ListItem>
											<ListItem class="list-item-details" >
												<ListItemDetails />
											</ListItem>
											<ListItem class="list-item-details" >
												<ListItemDetails />
											</ListItem>
										</ListItems>-->
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions en attente" />
					<!--					<ListItems>
											<ListItem class="list-item-confirm" >
												<ListItemConfirm />
											</ListItem>
											<ListItem class="list-item-confirm" >
												<ListItemConfirm />
											</ListItem>
											<ListItem class="list-item-confirm" >
												<ListItemConfirm />
											</ListItem>
											<ListItem class="list-item-confirm" >
												<ListItemConfirm />
											</ListItem>
										</ListItems>-->
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader icon="IconFilledCog" title="Missions passées" />
					<ListItems>
						<ListItem v-for="newMission in passedMissions.value" :key="newMission.id" class="list-item-details">
							<ListItemDetails :mission="newMission" />
						</ListItem>
					</ListItems>
				</CustomTabItem>
			</CustomTabItems>
		</div>
	</main>
</template>

<script>
	import { defineComponent, onMounted, reactive, ref, computed } from "vue"
	import { MISSIONS_TYPE, findMissionsForUserConnected } from "../api/missions"

	export default defineComponent({
		name: "Home",
		setup: () => {
			/* Datas */
			const tab = ref(0)
			const newMissions = reactive([{}])
			const upcomingMissions = reactive([{}])
			const pendingMissions = reactive([{}])
			const passedMissions = reactive([{}])

			/* Computed */
			const newMissionLength = computed(() => newMissions.value ? newMissions.value.length : 0)
			const upcomingMissionLength = computed(() => upcomingMissions.value ? upcomingMissions.value.length : 0)
			const pendingMissionLength = computed(() => pendingMissions.value ? pendingMissions.value.length : 0)
			const passedMissionsLength = computed(() => passedMissions.value ? passedMissions.value.length : 0)

			/* Lifecycle hooks*/
			onMounted(async () => {
				newMissions.value = await findMissionsForUserConnected(MISSIONS_TYPE.NEW)
				upcomingMissions.value = []//await findMissionsForUserConnected(MISSIONS_TYPE.UPCOMMING)
				pendingMissions.value = []//await findMissionsForUserConnected(MISSIONS_TYPE.PENDING)
				passedMissions.value = await findMissionsForUserConnected(MISSIONS_TYPE.PASSED)
			})

			return {
				/* Datas */
				tab,
				newMissions,
				upcomingMissions,
				pendingMissions,
				passedMissions,
				/* Computed */
				newMissionLength,
				upcomingMissionLength,
				pendingMissionLength,
				passedMissionsLength
			}
		}
	})
</script>