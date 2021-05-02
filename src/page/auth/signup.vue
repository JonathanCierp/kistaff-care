<template>
	<main class="signup">
		<div class="signup__header">
			<h1 class="signup__title">
				Inscription
			</h1>
			<ul class="signup__steps">
				<li :class="[step >= 0 ? 'signup__step--active' : '']" class="signup__step">
					Informations
				</li>
				<li :class="[step >= 1 ? 'signup__step--active' : '']" class="signup__step">
					Métiers
				</li>
				<li :class="[step >= 2 ? 'signup__step--active' : '']" class="signup__step">
					Compétences
				</li>
				<li :class="[step >= 3 ? 'signup__step--active' : '']" class="signup__step">
					Récapitulatif
				</li>
			</ul>
		</div>
		<CustomForm v-if="step === 0" class="signup__form signup__form--step-0">
			<p class="text-caption">* Champs obligatoire</p>
			<CustomRow class="signup__form__row">
				<CustomSelect v-model="form.salutation" :items="civilities" label="Civilité" placeholder="Civilité"
				              width="100%" />
			</CustomRow>
			<CustomRow class="signup__form__row">
				<CustomInput ref="fistNameInput" v-model="form.lastName" :rules="[
							v => !!v || 'Le champs Nom est obligatoire.'
					]" label="Nom *" placeholder="Nom" required width="48%" />
				<CustomInput ref="lastNameInput" v-model="form.firstName" :rules="[
							v => !!v || 'Le champs Prénom est obligatoire.'
					]" label="Prénom *" placeholder="Prénom" required width="48%" />
			</CustomRow>
			<CustomRow class="signup__form__row">
				<CustomInput ref="emailInput" v-model="form.email" :rules="[
							v => !!v || 'Le champs Email est obligatoire.',
              v => /.+@.+\..+/.test(v) || 'L\'adresse mail n\'est pas valide.'
					]" label="Email *" native-type="email" placeholder="Email" required width="100%" />
			</CustomRow>
			<CustomRow class="signup__form__row">
				<CustomInput ref="phoneInput" v-model="form.mobilePhone" :rules="[
							v => !!v || 'Le champs Téléphone est obligatoire.'
					]" label="Téléphone *" placeholder="Téléphone" required width="100%" />
			</CustomRow>
			<CustomRow class="signup__form__row">
				<CustomInput ref="streetInput" v-model="form.mailingStreet" :rules="[
							v => !!v || 'Le champs Rue est obligatoire.'
					]" label="Rue *" placeholder="Rue" required width="100%" />
				<CustomInput ref="postalCodeInput" v-model="form.mailingPostalCode" :rules="[
							v => !!v || 'Le champs Code postal est obligatoire.'
					]" label="Code postal *" placeholder="Code postal" required width="48%" />
				<CustomInput ref="cityInput" v-model="form.mailingCity" :rules="[
							v => !!v || 'Le champs Ville est obligatoire.'
					]" label="Ville *" placeholder="Ville" required width="48%" />
			</CustomRow>
			<CustomRow class="signup__form__action">
				<CustomButton block center @click="changeStep(1)">Suivant</CustomButton>
			</CustomRow>
		</CustomForm>
		<CustomForm v-if="step === 1" class="signup__form signup__form--step-1">
			<p v-if="!fonction && fonctionStepError" class="signup__form--error text-caption">
				<IconWarning />
				Le métier est obligatoire
			</p>
			<CustomRadio v-for="f in fonctions" :key="f.key" v-model="fonction" :label="f.value" :value="f.key"
			             name="fonction" @update:modelValue="changeFonction" />
			<CustomRow class="signup__form__action">
				<CustomButton text @click="changeStep(0)">Retour</CustomButton>
				<CustomButton @click="changeStep(2)">Suivant</CustomButton>
			</CustomRow>
		</CustomForm>
		<CustomForm v-if="step === 2" class="signup__form signup__form--step-2">
			<h3 class="signup__form__poles">Compétences</h3>
			<CustomCheckbox v-for="p in polePickListed" :key="p.key" v-model="pole" :label="p.value"
			                :name="p.key" :value="p.key" />
			<h3 class="signup__form__planning">Type de planning</h3>
			<CustomRadio v-model="planningType" label="Nuit" name="night" value="Night" />
			<CustomRadio v-model="planningType" label="Jour" name="day" value="Day" />
			<CustomRadio v-model="planningType" label="Peu importe" name="all" value="All" />
			<CustomRow class="signup__form__action">
				<CustomButton text @click="changeStep(1)">Retour</CustomButton>
				<CustomButton @click="changeStep(3)">Suivant</CustomButton>
			</CustomRow>
		</CustomForm>
		<CustomForm v-if="step === 3" class="signup__form signup__form--step-3">
			<h3>Récapitulatif</h3>
			<ul class="signup__form__list">
				<li v-html="recapConvertItem('Civilité', form.salutation)" />
				<li v-html="recapConvertItem('Nom', form.lastName)" />
				<li v-html="recapConvertItem('Prénom', form.firstName)" />
				<li v-html="recapConvertItem('Email', form.email)" />
				<li v-html="recapConvertItem('Rue', form.mailingStreet)" />
				<li v-html="recapConvertItem('Ville', form.mailingCity)" />
				<li v-html="recapConvertItem('Code postal', form.mailingPostalCode)" />
				<li v-html="recapConvertItem('Fonction', fonctions.find(f => f.key === fonction)?.value)" />
				<li v-html="recapConvertItem('Pôles', pole.map(p => poles.find(po => po.key === p).value)?.join(', '))" />
				<li v-html="recapConvertItem('Type de planning', 'planning')" />
			</ul>
			<h3>Information de connexion</h3>
			<CustomRow class="signup__form__row">
				<CustomInput ref="passwordInput" v-model="password" :rules="[
							v => !!v || 'Le champs Mot de passe est obligatoire.'
					]" label="Mot de passe *" native-type="password" placeholder="Mot de passe" required width="100%" />
			</CustomRow>
			<CustomRow class="signup__form__row">
				<CustomInput ref="passwordConfirmInput" v-model="passwordConfirm" :rules="[
								v => !!v || 'Le champs Confirmer le mot de passe est obligatoire.',
								v => v === password || 'Les mots de passes ne sont pas identiques.'
							]" label="Confirmer le mot de passe *" native-type="password" placeholder="Confirmer le mot de passe"
				             required width="100%" />
			</CustomRow>
			<CustomRow class="signup__form__action">
				<CustomButton text @click="changeStep(2)">Retour</CustomButton>
				<CustomButton @click="onSignUp">S'inscrire</CustomButton>
			</CustomRow>
		</CustomForm>
		<CustomRow v-if="step === 3" class="signup__cgu text-body-2">
			<p>
				En cliquant sur s'inscrire, vous acceptez nos
				<a class="font-medium" href="https://www.kistaff.fr/s/terms?language=fr" target="_blank">CGU</a>
			</p>
		</CustomRow>
		<CustomRow class="signup__have-account">
			<p>Vous avez déjà un compte ? <CustomLink class="font-medium" to="/auth/signin">Me connecter</CustomLink></p>
		</CustomRow>
	</main>
</template>

<script>
	import { defineComponent, onMounted, ref } from "vue"
	import {
		findPickList,
		findSobjectsForUserConnected,
		findSobjectsForUserConnectedFilteredByField,
		SOBJECTS_FIELD
	} from "../../api/sobjects"
	import { useRouter } from "vue-router"
	import { useStore } from "vuex"
	import { moveTawkToWidget } from "../../utils"

	export default defineComponent({
		name: "Signup",
		title: "Inscription - Kistaff",
		setup() {
			const store = useStore()
			const router = useRouter()

			/* Datas */
			const step = ref(0)
			const innerWidth = ref(window.innerWidth)
			const civilities = ref([])
			const fonctions = ref([])
			const poles = ref([])
			const pickLists = ref([])

			/* Step 1 */
			const form = ref({
				salutation: "",
				lastName: "",
				firstName: "",
				email: "",
				mobilePhone: "",
				mailingStreet: "",
				mailingPostalCode: "",
				mailingCity: ""
			})
			const fistNameInput = ref(null)
			const lastNameInput = ref(null)
			const emailInput = ref(null)
			const phoneInput = ref(null)
			const streetInput = ref(null)
			const postalCodeInput = ref(null)
			const cityInput = ref(null)

			/* Step 2 */
			const fonction = ref(null)
			const fonctionStepError = ref(false)

			/* Step 3 */
			const pole = ref([])
			const polePickListed = ref([])
			const poleStepError = ref(false)
			const planningType = ref("All")

			/* Step 4 */
			const password = ref("")
			const passwordConfirm = ref("")
			const passwordInput = ref(null)
			const passwordConfirmInput = ref(null)

			/* Methods */
			const changeStep = (tempStep) => {
				if(step.value === 0) {
					fistNameInput.value.validate()
					lastNameInput.value.validate()
					emailInput.value.validate()
					phoneInput.value.validate()
					streetInput.value.validate()
					postalCodeInput.value.validate()
					cityInput.value.validate()

					const isFormValid = !fistNameInput.value.inputError && !lastNameInput.value.inputError &&
							!emailInput.value.inputError && !phoneInput.value.inputError && !streetInput.value.inputError &&
							!postalCodeInput.value.inputError && !cityInput.value.inputError

					if(isFormValid) {
						step.value = tempStep
					}
				} else if(step.value === 1) {
					fonctionStepError.value = !!!fonction.value
					if(fonction.value) {
						step.value = tempStep
					}
				} else if(step.value === 2) {
					step.value = tempStep
				}

				if(step.value > tempStep) {
					step.value = tempStep
				}
			}
			const onSignUp = async () => {
				passwordInput.value.validate()
				passwordConfirmInput.value.validate()

				const isFormValid = !passwordInput.value.inputError && !passwordConfirmInput.value.inputError

				if(isFormValid) {
					try {
						await store.dispatch("signup", {
							...form.value,
							typeOfService: fonction.value,
							services: pole.value.join(";"),
							password: password.value,
							typeOfSchedule: planningType.value
						})
						localStorage.setItem("tempEmail", form.value.email)
						await router.push("/auth/signin")
					} catch(e) {

					}
				}
			}
			const recapConvertItem = (label, item) => {
				if(item === "planning") {
					item = planningType.value.includes("Day") && planningType.value.includes("Night") ? "Nuit et jour" : planningType.value.includes("Day") ? "Jour" : planningType.value.includes("Night") ? "Nuit" : "Nuit et jour"
				}
				const classNames = item ? "font-medium" : "italic"

				return `${label} : <span class="${classNames}">${item ? item : "A compléter"}</span>`
			}
			const changeFonction = (v) => {
				pole.value = []
				polePickListed.value = pickLists.value[v].map(p => poles.value.find(pole => pole.key === p))
			}

			/* Lifecycle Hooks */
			onMounted(async () => {
				await findSobjectsForUserConnected()

				civilities.value = await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.CIVILITY)
				fonctions.value = await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.FONCTION)
				poles.value = await findSobjectsForUserConnectedFilteredByField(SOBJECTS_FIELD.POLE)
				pickLists.value = await findPickList()


				moveTawkToWidget()
			})

			return {
				/* Datas */
				step,
				innerWidth,
				civilities,
				fonctions,
				poles,
				pickLists,
				polePickListed,
				form,
				fistNameInput,
				lastNameInput,
				emailInput,
				phoneInput,
				streetInput,
				postalCodeInput,
				cityInput,
				fonction,
				fonctionStepError,
				pole,
				poleStepError,
				planningType,
				password,
				passwordConfirm,
				passwordInput,
				passwordConfirmInput,
				/* Methods */
				changeStep,
				onSignUp,
				recapConvertItem,
				changeFonction
			}
		}
	})
</script>
