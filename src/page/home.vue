<template>
	<main class="missions">
		<PageHeader label="Mes missions" />
		<div v-if="show" class="missions__body">
			<CustomTabs v-model="tab">
				<CustomTab icon="IconFilledCog" name="new">
					A pourvoir&nbsp;<sub class="hide-on-mobile text-caption">({{ newMissions.value.missions.length }})</sub>
				</CustomTab>
				<CustomTab icon="IconFilledCog" name="upcoming">
					En cours&nbsp;<sub class="hide-on-mobile text-caption">({{ upcomingMissions.value.missions.length }})</sub>
				</CustomTab>
				<CustomTab icon="IconFilledCog" name="pending">
					En attente&nbsp;<sub class="hide-on-mobile text-caption">({{ pendingMissions.value.missions.length }})</sub>
				</CustomTab>
				<CustomTab icon="IconFilledCog" name="passed">
					Passées&nbsp;<sub class="hide-on-mobile text-caption">({{ passedMissions.value.missions.length }})</sub>
				</CustomTab>
			</CustomTabs>
			<CustomTabItems v-model="tab">
				<CustomTabItem name="new">
					<TabHeader v-model="searchNewMission" icon="IconFilledCog" searchable title="Missions à pourvoir" hide-label-on-mobile
					           @update:modelValue="v => onSearch('new', v)" />
					<ListItems>
						<CustomEntriesNotFound v-if="!newMissions.value.missions.length" label="Aucunes missions à pourvoir" alt="Aucunes missions à pourvoir" />
						<ListItem v-for="mission in newMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-confirm" confirm @open-accept="openDialog('accept', mission)"
						          @open-refuse="openDialog('refuse', mission)" />
					</ListItems>
				</CustomTabItem>
				<CustomTabItem name="upcoming">
					<TabHeader v-model="searchUpcomingMission" icon="IconFilledCog" searchable title="Missions en cours" hide-label-on-mobile
					           @update:modelValue="v => onSearch('upcoming', v)" />
					<ListItems>
						<CustomEntriesNotFound v-if="!upcomingMissions.value.missions.length" label="Aucunes missions en cours" alt="Aucunes missions en cours" />
						<ListItem v-for="mission in upcomingMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-details" details />
					</ListItems>
				</CustomTabItem>
				<CustomTabItem name="pending">
					<TabHeader v-model="searchPendingMission" icon="IconFilledCog" searchable title="Missions en attente" hide-label-on-mobile
					           @update:modelValue="v => onSearch('pending', v)" />
					<ListItems>
						<CustomEntriesNotFound v-if="!pendingMissions.value.missions.length" label="Aucunes missions en attente" alt="Aucunes missions en attente" />
						<ListItem v-for="mission in pendingMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-details" details />
					</ListItems>
				</CustomTabItem>
				<CustomTabItem name="passed">
					<TabHeader v-model="searchPassedMission" icon="IconFilledCog" searchable title="Missions passées" hide-label-on-mobile
					           @update:modelValue="v => onSearch('passed', v)" />
					<ListItems>
						<CustomEntriesNotFound v-if="!passedMissions.value.missions.length" label="Aucunes missions passées" alt="Aucunes missions passées" />
						<ListItem v-for="mission in passedMissions.value.missions" :key="mission.id" :mission="mission"
						          class="list-item-details" details />
					</ListItems>
				</CustomTabItem>
			</CustomTabItems>
		</div>
		<div v-else class="page-loader">
			<CustomProgressCircle color="var(--color-blue-primary)" indeterminate />
		</div>
		<AcceptMissionDialog v-model="acceptDialogOpen" :mission="currentMission" />
		<RefuseMissionDialog v-model="refuseDialogOpen" :mission="currentMission" />
	</main>
</template>

<script>
	import { defineComponent, onMounted, reactive, ref } from "vue"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "Home",
		setup: () => {
			const store = useStore()

			/* Datas */
			const show = ref(false)
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
				await store.dispatch("getMissions")

				newMissions.value = store.getters.filterMissions("new")
				upcomingMissions.value = store.getters.filterMissions("upcoming")
				pendingMissions.value = store.getters.filterMissions("pending")
				passedMissions.value = store.getters.filterMissions("passed")

				show.value = true
			})

			return {
				store,
				/* Datas */
				show,
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