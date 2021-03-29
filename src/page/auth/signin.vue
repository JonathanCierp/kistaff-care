<template>
	<main class="signin">
		<article class="signin__card">
			<div class="signin__brand">
				<img alt="" src="https://picsum.photos/80">
			</div>
			<h2 class="signin__title">Bienvenu(e) sur KISTAFF</h2>
			<CustomForm class="signin__form">
				<CustomRow class="signin__form__row">
					<CustomInput ref="emailInput" v-model="form.email" :rules="[
							v => !!v || 'Le champs Email est obligatoire.',
              v => /.+@.+\..+/.test(v) || 'L\'adresse mail n\'est pas valide.'
					]" label="Email" placeholder="Email" required native-type="email" />
				</CustomRow>
				<CustomRow class="signin__form__row">
					<CustomInput ref="passwordInput" v-model="form.password" :rules="[
							v => !!v || 'Le champs Mot de passe est obligatoire.'
					]" label="Mot de passe" native-type="password" placeholder="Mot de passe" required />
				</CustomRow>
				<CustomRow class="signin__action">
					<CustomButton block center native-type="submit" rounded="md" @click="onSubmit">Se connecter</CustomButton>
				</CustomRow>
			</CustomForm>
			<p class="signin__reset-password">
				<CustomLink to="/password/forgot">Mot de passe oublié</CustomLink>
			</p>
			<p class="signin__had-account">Vous n'avez pas de compte ?
				<RouterLink to="/auth/signup">S'inscrire</RouterLink>
			</p>
		</article>
	</main>
</template>

<script>
	import { defineComponent, reactive, ref } from "vue"
	import { useStore } from "vuex"
	import { useRouter } from "vue-router"

	export default defineComponent({
		name: "Signin",
		setup: () => {
			const store = useStore()
			const router = useRouter()
			/* Datas */
			const form = reactive({
				email: localStorage.getItem("tempEmail") ? localStorage.getItem("tempEmail") : "",
				password: ""
			})
			const emailInput = ref(null)
			const passwordInput = ref(null)

			/* Methods */
			const onSubmit = async (e) => {
				e.preventDefault()
				emailInput.value.validate()
				passwordInput.value.validate()

				const isFormValid = !emailInput.value.inputError && !passwordInput.value.inputError

				if(isFormValid) {
					await store.dispatch("login", form)
					if(!store.state.user.user.Contact.xDocuments_Received__c) {
						await router.push("/documents")
					}else {
						await router.push("/")
					}
				}
			}

			localStorage.removeItem("tempEmail")

			return {
				/* Datas */
				form,
				emailInput,
				passwordInput,
				/* Methods */
				onSubmit
			}
		}
	})
</script>
