<template>
	<main class="missions">
		<PageHeader label="Mes missions" />
		<div v-if="show && !error" class="missions__body">
			<CustomTabs v-model="tab">
				<CustomTab icon="IconCalendarPlus" name="new">
					A pourvoir&nbsp;<sub class="hide-on-mobile text-caption">({{ newMissions.value.missions.length }})</sub>
				</CustomTab>
				<CustomTab icon="IconCalendarExclamation" name="upcoming">
					En cours&nbsp;<sub class="hide-on-mobile text-caption">({{ upcomingMissions.value.missions.length }})</sub>
				</CustomTab>
				<CustomTab icon="IconCalendarEvent" name="pending">
					En attente&nbsp;<sub class="hide-on-mobile text-caption">({{ pendingMissions.value.missions.length }})</sub>
				</CustomTab>
				<CustomTab icon="IconCalendarClose" name="passed">
					Passées&nbsp;<sub class="hide-on-mobile text-caption">({{ passedMissions.value.missions.length }})</sub>
				</CustomTab>
			</CustomTabs>
			<CustomTabItems v-model="tab">
				<CustomTabItem name="new">
					<TabHeader v-model="searchNewMission" hide-label-on-mobile icon="IconCalendarPlus" searchable
					           title="Missions à pourvoir"
					           @update:modelValue="v => onSearch('new', v)" />
					<ListItems>
						<CustomEntriesNotFound v-if="!newMissions.value.missions.length" alt="Aucune mission à pourvoir"
						                       label="Aucune mission à pourvoir" />
						<ListItem v-for="mission in newMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-confirm" confirm @open-accept="openDialog('accept', mission)"
						          @open-refuse="openDialog('refuse', mission)" />
					</ListItems>
				</CustomTabItem>
				<CustomTabItem name="upcoming">
					<TabHeader v-model="searchUpcomingMission" hide-label-on-mobile icon="IconCalendarExclamation" searchable
					           title="Missions en cours"
					           @update:modelValue="v => onSearch('upcoming', v)" />
					<ListItems>
						<CustomEntriesNotFound v-if="!upcomingMissions.value.missions.length" alt="Aucune mission en cours"
						                       label="Aucune mission en cours" />
						<ListItem v-for="mission in upcomingMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-details" details />
					</ListItems>
				</CustomTabItem>
				<CustomTabItem name="pending">
					<TabHeader v-model="searchPendingMission" hide-label-on-mobile icon="IconCalendarEvent" searchable
					           title="Missions en attente"
					           @update:modelValue="v => onSearch('pending', v)" />
					<ListItems>
						<CustomEntriesNotFound v-if="!pendingMissions.value.missions.length" alt="Aucune mission en attente"
						                       label="Aucune mission en attente" />
						<ListItem v-for="mission in pendingMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-details" details />
					</ListItems>
				</CustomTabItem>
				<CustomTabItem name="passed">
					<TabHeader v-model="searchPassedMission" hide-label-on-mobile icon="IconCalendarClose" searchable
					           title="Missions passées"
					           @update:modelValue="v => onSearch('passed', v)" />
					<ListItems>
						<CustomEntriesNotFound v-if="!passedMissions.value.missions.length" alt="Aucune mission passée"
						                       label="Aucune mission passée" />
						<ListItem v-for="mission in passedMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-details" details />
					</ListItems>
				</CustomTabItem>
			</CustomTabItems>
		</div>
		<div v-else class="page-loader">
			<CustomProgressCircle v-if="!show" color="var(--color-blue-primary)" indeterminate />
			<CustomEntriesNotFound v-else alt="Erreur lors du chargement des missions, merci de contacter l'administrateur."
			                       label="Erreur lors du chargement des missions, merci de contacter l'administrateur." />
		</div>
		<AcceptMissionDialog v-model="acceptDialogOpen" :mission="currentMission" />
		<RefuseMissionDialog v-model="refuseDialogOpen" :mission="currentMission" />
	</main>
</template>

<script>
	import { defineComponent, inject, onMounted, reactive, ref } from "vue"
	import { useStore } from "vuex"
	import { moveTawkToWidget } from "../utils"

	export default defineComponent({
		name: "Home",
		title: "Mes missions - Kistaff",
		setup: () => {
			const store = useStore()
			//const firebaseMessaging = inject("firebaseMessaging")

			/*firebaseMessaging.onMessage(payload => {
				alert("Message received.")
			})*/

			/* Datas */
			const show = ref(false)
			const error = ref(false)
			const acceptDialogOpen = ref(false)
			const refuseDialogOpen = ref(false)
			const tab = ref("new")
			const searchNewMission = ref("")
			const searchUpcomingMission = ref("")
			const searchPendingMission = ref("")
			const searchPassedMission = ref("")
			let newMissions = reactive({})
			let upcomingMissions = reactive({})
			let pendingMissions = reactive({})
			let passedMissions = reactive({})
			let currentMission = ref({})

			/* Methods */
			const openDialog = (type, mission) => {
				currentMission.value = mission

				if(type === "accept") {
					acceptDialogOpen.value = true
				} else {
					refuseDialogOpen.value = true
				}
			}
			const onSearch = (type, v) => {
				console.log(v);
				switch(type) {
					case "new":
						newMissions.value = store.getters.filterMissions("new", v)
						break
					case "upcoming":
						upcomingMissions.value = store.getters.filterMissions("upcoming", v)
						break
					case "pending":
						pendingMissions.value = store.getters.filterMissions("pending", v)
						break
					case "passed":
						passedMissions.value = store.getters.filterMissions("passed", v)
						break
				}
			}

			/* Lifecycle hooks */
			onMounted(async () => {
				try {
					await store.dispatch("getMissions")

					newMissions.value = store.getters.filterMissions("new")
					upcomingMissions.value = store.getters.filterMissions("upcoming")
					pendingMissions.value = store.getters.filterMissions("pending")
					passedMissions.value = store.getters.filterMissions("passed")
				}catch(e) {
					error.value = true
				}finally {
					show.value = true
				}
			})

			return {
				store,
				/* Datas */
				show,
				error,
				acceptDialogOpen,
				refuseDialogOpen,
				tab,
				searchNewMission,
				searchUpcomingMission,
				searchPendingMission,
				searchPassedMission,
				newMissions,
				upcomingMissions,
				pendingMissions,
				passedMissions,
				currentMission,
				/* Methods */
				openDialog,
				onSearch
			}
		}
	})
</script>
