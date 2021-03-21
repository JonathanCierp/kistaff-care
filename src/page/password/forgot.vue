<template>
	<main class="forgot">
		<article class="forgot__card">
			<div class="signin__brand">
				<img alt="" src="https://picsum.photos/80">
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
					<CustomButton block center native-type="submit" rounded="md" @click="onSubmit">Se connecter</CustomButton>
				</div>
			</CustomForm>
		</article>
	</main>
</template>

<script>
	import { defineComponent, reactive, ref } from "vue"
	import { useStore } from "vuex"
	import { useRouter } from "vue-router"

	export default defineComponent({
		name: "PasswordForgot",
		setup: () => {
			const store = useStore()
			const router = useRouter()
			/* Datas */
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

			return {
				/* Datas */
				form,
				emailInput,
				/* Methods */
				onSubmit
			}
		}
	})
</script>