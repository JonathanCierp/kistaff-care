<template>
  <main class="settings">
	  <PageHeader label="Mes paramètres" />
	  <div class="settings__body">
		  <CustomTabs v-model="tab">
			  <CustomTab icon="IconCircleOutlineUser">Mes informations</CustomTab>
		  </CustomTabs>
		  <CustomTabItems v-model="tab">
			  <CustomTabItem>
				  <TabHeader icon="IconCircleOutlineUser" title="Mes informations" />
				  <form class="settings__form">
					  <div class="settings__form__row">
						  <CustomSelect v-model="user.civility" :items="civility" label="Civilité" placeholder="Civilité" width="300px" />
					  </div>
					  <div class="settings__form__row">
						  <CustomInput v-model="user.firstName" label="Nom" placeholder="Nom" width="300px" />
						  <CustomInput v-model="user.lastName" label="Prénom" placeholder="Prénom" width="300px" />
					  </div>
					  <div class="settings__form__row">
						  <CustomInput v-model="user.phone" label="Téléphone" mobile placeholder="Téléphone mobile" width="300px" />
						  <CustomInput v-model="user.email" label="Adresse e-mail" mail placeholder="Adresse mail" width="300px" />
					  </div>
					  <h2>Adresse</h2>
					  <div class="settings__form__row">
						  <CustomInput v-model="user.street" label="Rue" placeholder="Rue" width="300px" />
						  <CustomInput v-model="user.postalCode" label="Code" postal placeholder="Code postal" width="300px" />
						  <CustomInput v-model="user.city" label="Ville" placeholder="Ville" width="300px" />
					  </div>
					  <h2>Fonction</h2>
					  <div class="settings__form__row">
<!--						  <CustomSelect label="Fonction" placeholder="Fonction" width="300px" />
						  <CustomSelect label="Pôle" placeholder="Pôle" width="300px" />-->
						  <div class="settings__form__planning">
							  <CustomButton text :class="planningType === 'day' ? 'settings__planning--active' : ''" @click="onChangePlanning('day')">
								  <IconSun />
								  Jour
							  </CustomButton>
							  <CustomButton text :class="planningType === 'night' ? 'settings__planning--active' : ''" @click="onChangePlanning('night')">
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
    name: "Settings",
		setup: () => {
    	const store = useStore()
			const civility = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."]
			/* Datas */
			const tab = ref(0)
			const planningType = ref(null)
			console.log(store.state.user)
			const user = reactive({
				civility: store.state.user.Salutation,
				firstName: store.state.user.FirstName,
				lastName: store.state.user.LastName,
				phone: store.state.user.MobilePhone,
				email: store.state.user.Email,
				street: store.state.user.MailingAddress.street,
				postalCode: store.state.user.MailingAddress.postalCode,
				city: store.state.user.MailingAddress.city
			})

			/* Methods */
			const onChangePlanning = (type) => {
				planningType.value = type
			}

			return {
				civility,
				/* Datas */
				tab,
				planningType,
				user,
				/* Methods */
				onChangePlanning
			}
		}
  })
</script>