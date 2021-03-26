<template>
  <main class="signup">
	  <div class="signup__header">
		  <h1 class="signup__title">
			  Inscription
		  </h1>
		  <ul class="signup__steps">
			  <li class="signup__step" :class="[step >= 0 ? 'signup__step--active' : '']">
					Information
			  </li>
			  <li class="signup__step" :class="[step >= 1 ? 'signup__step--active' : '']">
				  Métiers
			  </li>
			  <li class="signup__step" :class="[step >= 2 ? 'signup__step--active' : '']">
				  Compétences
			  </li>
			  <li class="signup__step" :class="[step >= 3 ? 'signup__step--active' : '']">
					Récapitulatif
			  </li>
		  </ul>
	  </div>
	  <CustomForm class="signup__form">
		  <CustomRow class="signup__form__row">
			  <CustomInput ref="emailInput" v-model="form.FirstName" :rules="[
							v => !!v || 'Le champs Email est obligatoire.',
              v => /.+@.+\..+/.test(v) || 'L\'adresse mail n\'est pas valide.'
					]" placeholder="Nom" required />
		  </CustomRow>
		  <CustomRow class="signup__form__row">
			  <CustomInput ref="emailInput" v-model="form.LastName" :rules="[
							v => !!v || 'Le champs Email est obligatoire.',
              v => /.+@.+\..+/.test(v) || 'L\'adresse mail n\'est pas valide.'
					]" placeholder="Prenom" required />
		  </CustomRow>
		  <CustomRow class="signup__form__row">
			  <CustomInput ref="emailInput" v-model="form.Email" :rules="[
							v => !!v || 'Le champs Email est obligatoire.',
              v => /.+@.+\..+/.test(v) || 'L\'adresse mail n\'est pas valide.'
					]" placeholder="Email" required native-type="email" />
		  </CustomRow>
		  <CustomRow class="signup__form__row">
			  <CustomInput ref="emailInput" v-model="password" :rules="[
							v => !!v || 'Le champs Email est obligatoire.',
              v => /.+@.+\..+/.test(v) || 'L\'adresse mail n\'est pas valide.'
					]" placeholder="Mot de passe" required native-type="password" />
		  </CustomRow>
		  <CustomRow class="signup__form__row">
			  <CustomInput ref="emailInput" v-model="passwordConfirm" :rules="[
							v => !!v || 'Le champs Email est obligatoire.',
              v => /.+@.+\..+/.test(v) || 'L\'adresse mail n\'est pas valide.'
					]" placeholder="Confirmer le mot de passe" required native-type="password" />
		  </CustomRow>
	  </CustomForm>
  </main>
</template>

<script>
  import { defineComponent, ref } from "vue"

	export default defineComponent({
    name: "Signup",
		setup() {
    	/* Datas */
    	const step = ref(0)
    	const innerWidth = ref(window.innerWidth)
    	const form = ref({
		    email: ""
	    })

			return {
    		/* Datas */
    		step,
				innerWidth,
				form
			}
		}
  })
</script>
