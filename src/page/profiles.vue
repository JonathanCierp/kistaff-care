<template>
	<main class="settings">
		<PageHeader label="Mon profil" />
		<div class="settings__body">
			<CustomTabs v-model="tab">
				<CustomTab icon="IconCircleOutlineUser">Mes informations</CustomTab>
				<CustomTab icon="IconCircleOutlineUser">Mes préférences</CustomTab>
			</CustomTabs>
			<CustomTabItems v-model="tab">
				<CustomTabItem>
					<TabHeader button-label="Enregistrer" icon="IconCircleOutlineUser" title="Mes informations"
					           @callback="saveInformations" />
					<form class="settings__form">
						<div class="settings__form__row">
							<CustomSelect v-model="user.civility" :items="civility" label="Civilité" placeholder="Civilité"
							              width="300px" />
						</div>
						<div class="settings__form__row">
							<CustomInput v-model="user.firstName" label="Nom" placeholder="Nom" width="300px" />
							<CustomInput v-model="user.lastName" label="Prénom" placeholder="Prénom" width="300px" />
						</div>
						<div class="settings__form__row">
							<CustomInput v-model="user.phone" label="Téléphone" mobile placeholder="Téléphone mobile" width="300px" />
							<CustomInput v-model="user.email" label="Adresse e-mail" mail placeholder="Adresse mail" width="300px" />
						</div>
						<div class="settings__form__row">
							<CustomInput v-model="user.phone" label="N° sécurité sociale" mobile placeholder="N° sécurité sociale"
							             width="300px" />
							<CustomInput v-model="user.email" label="N° adéli" mail placeholder="N° adéli" width="300px" />
						</div>
						<h2>Adresse</h2>
						<div class="settings__form__row">
							<CustomInput v-model="user.street" label="Rue" placeholder="Rue" width="300px" />
							<CustomInput v-model="user.postalCode" label="Code" placeholder="Code postal" postal width="300px" />
							<CustomInput v-model="user.city" label="Ville" placeholder="Ville" width="300px" />
						</div>
					</form>
				</CustomTabItem>
				<CustomTabItem>
					<TabHeader button-label="Enregistrer" icon="IconCircleOutlineUser" title="Mes préférences"
					           @callback="savePreference" />
					<form class="settings__form">
						<div class="settings__form__row">
							<CustomSelect v-model="user.fonction" :items="fonction" label="Fonction" placeholder="Fonction"
							              width="300px" />
							<CustomSelect v-model="user.pole" :items="pole" label="Pôle" multiple placeholder="Pôle" width="450px" />
						</div>
						<div class="settings__form__action">
							<label for="">Type de planning</label>
							<div class="settings__form__planning">
								<CustomButton :class="scheduleDay ? 'settings__planning--active' : ''" text
								              @click="onChangeSchedule('Day')">
									<IconSun />
									Jour
								</CustomButton>
								<CustomButton :class="scheduleNight ? 'settings__planning--active' : ''" text
								              @click="onChangeSchedule('Night')">
									<IconMoon />
									Nuit
								</CustomButton>
							</div>
						</div>
					</form>
				</CustomTabItem>
			</CustomTabItems>
		</div>
	</main>
</template>

<script>
	import { defineComponent, reactive, ref } from "vue"
	import { useStore } from "vuex"

	export default defineComponent({
		name: "Profiles",
		setup: () => {
			const store = useStore()
			const civility = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."]
			const fonction = [
				{
					key: "Nurse",
					value: "IDE"
				},
				{
					key: "Caregiver",
					value: "Aide soignante"
				},
				{
					key: "Auxiliaire de vie",
					value: "Auxiliaire de vie"
				},
				{
					key: "Operating Room Nurse",
					value: "IBODE"
				},
				{
					key: "Sage-femme",
					value: "Sage-femme"
				}
			]
			const pole = [
				{
					key: "Emergency",
					value: "Urgence"
				},
				{
					key: "Geriatric",
					value: "Gériatrie"
				},
				{
					key: "Intensive Care",
					value: "Soins intensifs"
				},
				{
					key: "Medicine",
					value: "Medicine"
				},
				{
					key: "Paediatric",
					value: "Pédiatrie"
				}
			]
			/* Datas */
			const tab = ref(0)
			const user = reactive({
				civility: store.state.user.Salutation,
				firstName: store.state.user.FirstName,
				lastName: store.state.user.LastName,
				phone: store.state.user.MobilePhone,
				email: store.state.user.Email,
				street: store.state.user.MailingAddress.street,
				postalCode: store.state.user.MailingAddress.postalCode,
				city: store.state.user.MailingAddress.city,
				fonction: "Nurse",
				pole: "Emergency;Paediatric;Intensive Care",
				schedule: store.state.user.xType_of_Schedule__c
			})
			const scheduleDay = ref(user.schedule === "Day")
			const scheduleNight = ref(user.schedule === "Night")

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
			const saveInformations = () => {
				console.log("save information")
				console.log(user.schedule)
				store.dispatch("saveUser", {
					id: store.state.user.Id,
					test: {
						Salutation: user.civility,
						FirstName: user.firstName,
						LastName: user.lastName,
						MobilePhone: user.phone,
						Email: user.email,
						//"Email": user.email, Securité sociale
						//"Email": user.email, Adéli
						MailingStreet: user.street,
						MailingPostalCode: user.postalCode,
						MailingCity: user.city
					}
				})
			}
			const savePreference = () => {
				console.log("save preference")
				console.log(user.schedule)
				/*store.dispatch("saveUser", {
					"xType_of_service__c": user.fonction,
					"xServices__c": user.pole,
					"xType_of_Schedule__c": user.schedule
				})*/
			}

			return {
				civility,
				fonction,
				pole,
				/* Datas */
				tab,
				user,
				scheduleDay,
				scheduleNight,
				/* Methods */
				onChangeSchedule,
				saveInformations,
				savePreference
			}
		}
	})
</script>