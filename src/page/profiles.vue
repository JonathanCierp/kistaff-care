<template>
	<main class="profiles">
		<PageHeader label="Mon profil" />
		<div class="profiles__body">
			<CustomTabs v-model="tab">
				<CustomTab icon="IconCircleOutlineUser">Mes informations</CustomTab>
				<CustomTab icon="IconFilledCog">Mes absences</CustomTab>
				<!--				<CustomTab icon="IconFilledCog">Mes Spécialités</CustomTab>-->
				<CustomTab icon="IconFilledCog">Mes préférences</CustomTab>
			</CustomTabs>
			<CustomTabItems v-model="tab">
				<CustomTabItem>
					<TabHeader :loading="loading" button-icon="IconSave" button-label="Enregistrer"
					           icon="IconCircleOutlineUser"
					           title="Mes informations" @callback="saveInformations" />
					<CustomForm class="profiles__form">
						<CustomRow>
							<CustomSelect v-model="user.civility" :items="civility.value" label="Civilité" placeholder="Civilité"
							              width="300px" />
						</CustomRow>
						<CustomRow>
							<CustomInput v-model="user.firstName" label="Nom" placeholder="Nom" width="300px" />
							<CustomInput v-model="user.lastName" label="Prénom" placeholder="Prénom" width="300px" />
						</CustomRow>
						<CustomRow>
							<CustomInput v-model="user.phone" label="Téléphone" mobile placeholder="Téléphone mobile" width="300px" />
							<CustomInput v-model="user.email" label="Adresse e-mail" mail placeholder="Adresse mail" width="300px" />
						</CustomRow>
						<CustomRow>
							<CustomInput v-model="user.ssn" label="N° sécurité sociale" mobile placeholder="N° sécurité sociale"
							             width="300px" />
							<CustomInput v-model="user.adeli" label="N° adéli" mail placeholder="N° adéli" width="300px" />
						</CustomRow>
						<h2>Adresse</h2>
						<CustomRow>
							<CustomInput v-model="user.street" label="Rue" placeholder="Rue" width="300px" />
							<CustomInput v-model="user.postalCode" label="Code" placeholder="Code postal" postal width="300px" />
							<CustomInput v-model="user.city" label="Ville" placeholder="Ville" width="300px" />
						</CustomRow>
					</CustomForm>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader :loading="loading" button-icon="IconSave" button-label="Enregistrer" icon="IconFilledCog"
					           title="Absence" @callback="saveAbsence" />
					<form class="profiles__form">
						<CustomRow>
							<CustomDatePicker v-model="user.absenceStartDate" class="mr-4" label="Date de début" />
							<CustomDatePicker v-model="user.absenceEndDate" label="Date de fin" />
						</CustomRow>
					</form>
				</CustomTabItem>
			</CustomTabItems>
		</div>
	</main>
</template>

<script>
	import { defineComponent, onMounted, reactive, ref } from "vue"
	import { useStore } from "vuex"
	import {
		findSobjectsForUserConnected,
		findSobjectsForUserConnectedFilteredByField,
		SOBJECTS_FIELD
	} from "../api/sobjects"

	export default defineComponent({
		name: "Profiles",
		setup: () => {
			const store = useStore()

			/* Datas */
			const tab = ref(0)
			const civility = reactive({})
			const fonction = reactive({})
			const pole = reactive({})
			const user = reactive({
				civility: store.state.user.Salutation,
				firstName: store.state.user.FirstName,
				lastName: store.state.user.LastName,
				phone: store.state.user.MobilePhone,
				email: store.state.user.Email,
				street: store.state.user.MailingAddress.street,
				postalCode: store.state.user.MailingAddress.postalCode,
				city: store.state.user.MailingAddress.city,
				ssn: store.state.user.xDecrypted_SSN__c,
				adeli: store.state.user.xNumero_ADELI__c,
				fonction: "Nurse",
				pole: "Emergency;Paediatric;Intensive Care",
				schedule: store.state.user.xType_of_Schedule__c,
				absenceStartDate: (new Date(store.state.user.xLeave_From__c)).toISOString().split('T')[0],
				absenceEndDate: (new Date(store.state.user.xLeave_To__c)).toISOString().split('T')[0]
			})

			const scheduleDay = ref(user.schedule === "Day" || user.schedule === "All")
			const scheduleNight = ref(user.schedule === "Night" || user.schedule === "All")
			const loading = ref(false)

			/* Methods */
			const onChangeSchedule = (type) => {
				if(type === "Day") {
					scheduleDay.value = !scheduleDay.value
				} else if(type === "Night") {
					scheduleNight.value = !scheduleNight.value
				}

				if(scheduleDay.value) {
					user.schedule = "Day"
				} else if(scheduleNight.value) {
					user.schedule = "Night"
				}

				if(scheduleDay.value && scheduleNight.value) {
					user.schedule = "All"
				}
			}
			const saveInformations = async () => {
				try {
					loading.value = true
					await store.dispatch("editUser", {
						id: store.state.user.Id,
						user: {
							Salutation: user.civility,
							FirstName: user.firstName,
							LastName: user.lastName,
							MobilePhone: user.phone,
							Email: user.email,
							xSSN__c: user.ssn,
							xNumero_ADELI__c: user.adeli,
							MailingStreet: user.street,
							MailingPostalCode: user.postalCode,
							MailingCity: user.city
						}
					})
				} catch(e) {
					
				}
				loading.value = false
			}
			const saveAbsence = async () => {
				try {
					loading.value = true
					await store.dispatch("editUser", {
						id: store.state.user.Id,
						user: {
							xLeave_From__c: user.absenceStartDate,
							xLeave_To__c: user.absenceEndDate
						}
					})

				} catch(e) {

				}
				loading.value = false
			}
			const savePreference = async () => {
				try {
					loading.value = true
					await store.dispatch("editUser", {
						id: store.state.user.Id,
						user: {
							xType_of_service__c: user.fonction,
							xServices__c: user.pole,
							xType_of_Schedule__c: user.schedule
						}
					})
				} catch(e) {
				}

				loading.value = false
			}

			/* Lifecycle Hooks */
			onMounted(async () => {
				await findSobjectsForUserConnected()

				civility.value = await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.CIVILITY)
				fonction.value = await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.FONCTION)
				pole.value = await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.POLE)
			})

			return {
				/* Datas */
				tab,
				civility,
				fonction,
				pole,
				user,
				scheduleDay,
				scheduleNight,
				loading,
				/* Methods */
				onChangeSchedule,
				saveInformations,
				saveAbsence,
				savePreference
			}
		}
	})
</script>