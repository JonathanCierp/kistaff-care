<template>
	<main class="profiles">
		<PageHeader label="Mon profil" />
		<div v-if="show" class="profiles__body">
			<CustomTabs v-model="tab">
				<CustomTab icon="IconCircleOutlineUser">Informations</CustomTab>
				<CustomTab icon="IconFilledCog">Absences</CustomTab>
				<!--				<CustomTab icon="IconFilledCog">Mes Spécialités</CustomTab>-->
				<CustomTab icon="IconFilledCog">Préférences</CustomTab>
			</CustomTabs>
			<CustomTabItems v-model="tab">
				<CustomTabItem>
					<TabHeader :loading="loading" button-icon="IconSave" button-label="Enregistrer"
					           icon="IconCircleOutlineUser"
					           title="Mes informations" @callback="saveInformations" />
					<CustomForm class="profiles__form">
						<CustomRow>
							<CustomButton :loading="resetLoading" class="tabs-header__button" icon-left="IconLock"
							              @click="resetPasswordDialogOpen = true">Changer le mot de passe</CustomButton>
						</CustomRow>
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
							<CustomInput v-model="user.email" label="Adresse e-mail" mail placeholder="Adresse mail" width="300px" native-type="email" />
						</CustomRow>
						<CustomRow>
							<CustomInput v-model="user.ssn" label="N° sécurité sociale" mobile placeholder="N° sécurité sociale"
							             width="300px" />
							<CustomInput v-model="user.adeli" label="N° adéli" mail placeholder="N° adéli" width="300px" />
						</CustomRow>
						<h2>Adresse</h2>
						<CustomRow>
							<CustomInput v-model="user.street" label="Rue" placeholder="Rue" width="300px" />
							<CustomInput v-model="user.postalCode" label="Code postal" placeholder="Code postal" postal width="300px" />
							<CustomInput v-model="user.city" label="Ville" placeholder="Ville" width="300px" />
						</CustomRow>
					</CustomForm>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader :loading="loading" button-icon="IconSave" button-label="Enregistrer" icon="IconFilledCog"
					           title="Absence" @callback="saveAbsence" />
					<form class="profiles__form">
						<CustomRow>
							<div class="custom-input">
								<label>Date de début</label>
								<datepicker v-model="user.absenceStartDate" :locale="locale" inputFormat="dd-MM-yyyy" startingView="year" />
							</div>
							<div class="custom-input">
								<label>Date de fin</label>
								<datepicker v-model="user.absenceEndDate" :locale="locale" inputFormat="dd-MM-yyyy" startingView="year" />
							</div>
						</CustomRow>
					</form>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader :loading="loading" button-icon="IconSave" button-label="Enregistrer" icon="IconFilledCog"
					           title="Préférence" @callback="savePreference" />
					<form class="profiles__form">
						<CustomRow>
							<CustomCheckbox v-model="preferences" label="Notfication email" name="email" value="Email" right-label />
						</CustomRow>
						<CustomRow>
							<CustomCheckbox v-model="preferences" label="Notfication mobile" name="mobile" value="App" right-label />
						</CustomRow>
						<CustomRow>
							<CustomCheckbox v-model="preferences" label="Thème sombre (pour cet appareil)" name="sombre" value="dark-theme" right-label />
						</CustomRow>
					</form>
				</CustomTabItem>
			</CustomTabItems>
		</div>
		<div v-else class="page-loader">
			<CustomProgressCircle color="var(--color-blue-primary)" indeterminate />
		</div>
		<ResetPasswordDialog v-model="resetPasswordDialogOpen" />
	</main>
</template>

<script>
	import { defineComponent, onMounted, reactive, ref } from "vue"
	import { useStore } from "vuex"
	import { fr } from "date-fns/locale"
	import {
		findSobjectsForUserConnected,
		findSobjectsForUserConnectedFilteredByField,
		SOBJECTS_FIELD
	} from "../api/sobjects"

	export default defineComponent({
		name: "Profiles",
		setup: () => {
			const store = useStore()
			const locale = fr

			/* Datas */
			const show = ref(false)
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
				street: store.state.user.MailingAddress?.street,
				postalCode: store.state.user.MailingAddress?.postalCode,
				city: store.state.user.MailingAddress?.city,
				ssn: store.state.user.xDecrypted_SSN__c,
				adeli: store.state.user.xNumero_ADELI__c,
				fonction: store.state.user.xType_of_service__c,
				pole: store.state.user.xServices__c,
				schedule: store.state.user.xType_of_Schedule__c,
				absenceStartDate: store.state.user.xLeave_From__c ? new Date(store.state.user.xLeave_From__c) : null,
				absenceEndDate: store.state.user.xLeave_To__c ? new Date(store.state.user.xLeave_To__c) : null
			})

			const scheduleDay = ref(user.schedule === "Day" || user.schedule === "All")
			const scheduleNight = ref(user.schedule === "Night" || user.schedule === "All")
			const loading = ref(false)
			const resetLoading = ref(false)
			const resetPasswordDialogOpen = ref(false)
			const preferences = ref([])

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
							xPrimary_Channel__c: preferences.value.includes("Email") ? "Email" : "",
							xSecondary_Channel__c: preferences.value.includes("App") ? "App" : ""
						}
					})
					if(preferences.value.includes("dark-theme")) {
						localStorage.setItem("dark-theme", "true")
						document.body.classList.add("theme-dark")
					}else {
						localStorage.removeItem("dark-theme")
						document.body.classList.remove("theme-dark")
					}
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

				if(store.state.user.xPrimary_Channel__c) {
					preferences.value.push(store.state.user.xPrimary_Channel__c)
				}
				if(store.state.user.xSecondary_Channel__c) {
					preferences.value.push(store.state.user.xSecondary_Channel__c)
				}
				if(localStorage.getItem("dark-theme") === "true") {
					preferences.value.push("dark-theme")
				}

				show.value = true
			})

			return {
				locale,
				/* Datas */
				show,
				tab,
				civility,
				fonction,
				pole,
				user,
				scheduleDay,
				scheduleNight,
				loading,
				resetLoading,
				resetPasswordDialogOpen,
				preferences,
				/* Methods */
				onChangeSchedule,
				saveInformations,
				saveAbsence,
				savePreference
			}
		}
	})
</script>
