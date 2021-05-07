<template>
	<main class="forgot">
		<article class="forgot__card">
			<div class="signin__brand">
				<img alt="Kistaff logo circle" src="/img/brand-logo.png">
			</div>
			<h2 class="forgot__title">Veuillez entrer l'adresse email que vous avez utilisée lors de la création de votre
				compte. Un email sera envoyé à cette adresse avec des instructions supplémentaires sur la façon de réinitialiser
				votre mot de passe.</h2>
			<CustomForm class="signin__form">
				<div class="signin__form__row">
					<CustomInput ref="emailInput" v-model="form.email" :rules="[
							v => !!v || 'Le champs Email est obligatoire.',
              v => /.+@.+\..+/.test(v) || 'L\'adresse mail n\'est pas valide.'
					]" label="Email" placeholder="Email" required />
				</div>
				<div class="signin__action">
					<CustomButton v-if="isMobile" block center native-type="submit" rounded="md" text @click="router.go(-1)">Retour</CustomButton>
					<CustomButton v-else block center native-type="submit" rounded="md" text @click="$router.push('/')">Retour</CustomButton>
					<CustomButton block center native-type="submit" rounded="md" @click="onSubmit">Réinitialiser</CustomButton>
				</div>
			</CustomForm>
		</article>
	</main>
</template>

<script>
	import { defineComponent, onMounted, reactive, ref } from "vue"
	import { useStore } from "vuex"
	import { useRouter } from "vue-router"
	import {
		findSobjectsForUserConnected,
		findSobjectsForUserConnectedFilteredByField,
		SOBJECTS_FIELD
	} from "../../api/sobjects"
	import { moveTawkToWidget } from "../../utils"

	export default defineComponent({
		name: "PasswordForgot",
		title: "Réinitialisation du mot de passe - Kistaff",
		setup: () => {
			const store = useStore()
			const router = useRouter()
			/* Datas */
			const isMobile = ref(window.innerWidth < 500)
			const form = reactive({
				email: "",
			})
			const emailInput = ref(null)
			/* Methods */
			const onSubmit = async (e) => {
				e.preventDefault()
				emailInput.value.validate()

				const isFormValid = !emailInput.value.inputError

				if(isFormValid) {
					await store.dispatch("forgotPassword", form)
					await router.push("/auth/signin")
				}
			}

			/* Lifecycle Hooks */
			onMounted(async () => {
				moveTawkToWidget()
			})

			return {
				/* Datas */
				isMobile,
				form,
				emailInput,
				/* Methods */
				onSubmit
			}
		}
	})
</script>
