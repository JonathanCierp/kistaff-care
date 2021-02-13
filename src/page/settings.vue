<template>
  <main class="settings">
	  <PageHeader label="Mes paramètres" />
	  <div class="settings__body">
		  <CustomTabs v-model="tab">
			  <CustomTab icon="IconCircleOutlineUser">Mes informations</CustomTab>
<!--			  <CustomTab icon="IconFilledCog">Mes préférences</CustomTab>-->
		  </CustomTabs>
		  <CustomTabItems v-model="tab">
			  <CustomTabItem>
				  <TabHeader icon="IconCircleOutlineUser" title="Mes informations" />
				  <form class="settings__form">
					  <div class="settings__form__row">
						  <CustomSelect label="Civilité" placeholder="Civilité" width="300px" />
					  </div>
					  <div class="settings__form__row">
						  <CustomInput label="Nom" placeholder="Nom" width="300px" />
						  <CustomInput label="Prénom" placeholder="Prénom" width="300px" />
					  </div>
					  <div class="settings__form__row">
						  <CustomInput label="Téléphone" mobile placeholder="Téléphone mobile" width="300px" />
						  <CustomInput label="Adresse" mail placeholder="Adresse mail" width="300px" />
					  </div>
					  <h2>Adresse</h2>
					  <div class="settings__form__row">
						  <CustomInput label="Rue" placeholder="Rue" width="300px" />
						  <CustomInput label="Code" postal placeholder="Code postal" width="300px" />
						  <CustomInput label="Ville" placeholder="Ville" width="300px" />
					  </div>
					  <h2>Fonction</h2>
					  <div class="settings__form__row">
						  <CustomSelect label="Fonction" placeholder="Fonction" width="300px" />
						  <CustomSelect label="Pôle" placeholder="Pôle" width="300px" />
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
<!--			  <CustomTabItem>
				  <TabHeader icon="IconFilledCog" title="Mes préférences" />
			  </CustomTabItem>-->
		  </CustomTabItems>
	  </div>
  </main>
</template>

<script>
	import { defineComponent, ref } from "vue"
  import PageHeader from "../components/page/PageHeader.vue"
  import CustomTabs from "../components/custom/tabs/CustomTabs.vue"
  import CustomTab from "../components/custom/tabs/CustomTab.vue"
  import CustomTabItems from "../components/custom/tabs/CustomTabItems.vue"
  import CustomTabItem from "../components/custom/tabs/CustomTabItem.vue"
	import CustomInput from "../components/custom/form/CustomInput.vue"
	import CustomSelect from "../components/custom/form/CustomSelect.vue"
	import CustomButton from "../components/custom/CustomButton.vue"
	import TabHeader from "../components/page/tab/TabHeader.vue"
	import IconSun from "../components/icons/IconSun.vue"
	import IconMoon from "../components/icons/IconMoon.vue"

	export default defineComponent({
    name: "Settings",
		components: {
			PageHeader,
			CustomTabs,
			CustomTab,
			CustomTabItems,
			CustomTabItem,
			CustomInput,
			CustomSelect,
			CustomButton,
			TabHeader,
			IconMoon,
			IconSun
		},
		setup: () => {
			/* Datas */
			const tab = ref(0)
			const planningType = ref(null)

			/* Methods */
			const onChangePlanning = (type) => {
				planningType.value = type
			}

			return {
				/* Datas */
				tab,
				planningType,
				/* Methods */
				onChangePlanning
			}
		}
  })
</script>