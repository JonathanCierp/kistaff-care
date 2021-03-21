<template>
	<CustomDialog max-width="350px" transition="slide-down">
		<CustomDialogTitle label="Changer le mot de passe" @close="$emit('update:modelValue', false)" />
		<CustomDialogBody>
			<CustomForm>
				<CustomRow>
					<CustomInput ref="oldPasswordInput" v-model="oldPassword" :rules="[
												v => !!v || 'Ce champs est obligatoire.'
										 ]" required label="Ancient mot de passe" native-type="password"
					             placeholder="Ancient mot de passe" width="100%" />
				</CustomRow>
				<CustomRow>
					<CustomInput ref="newPasswordInput" v-model="newPassword" :rules="[
												v => !!v || 'Ce champs est obligatoire.'
										 ]" required label="Nouveau mot de passe" native-type="password"
					             placeholder="Nouveau mot de passe" width="100%" />
				</CustomRow>
				<CustomRow>
					<CustomInput ref="newPasswordConfirmInput" v-model="newPasswordConfirm" :rules="[
												v => !!v || 'Ce champs est obligatoire.',
												v => v === newPassword || 'Mot de passes non identiques.'
										 ]" required label="Confirmer le mot de passe" native-type="password"
					             placeholder="Confirmer le mot de passe" width="100%" />
				</CustomRow>
			</CustomForm>
		</CustomDialogBody>
		<CustomDialogActions>
			<CustomButton size="sm" text @click="$emit('update:modelValue', false)">Fermer</CustomButton>
			<CustomButton native-type="submit" :disabled="loading" :loading="loading" size="sm" type="success" @click="resetPassword">Modifier
			</CustomButton>
		</CustomDialogActions>
	</CustomDialog>
</template>

<script>
	import { defineComponent, ref } from "vue"
	import { useStore } from "vuex"
	import { useRouter } from "vue-router"

	export default defineComponent({
		name: "ResetPasswordDialog",
		setup(props, { emit }) {
			const store = useStore()
			const router = useRouter()
			/* Datas */
			const oldPassword = ref("")
			const newPassword = ref("")
			const newPasswordConfirm = ref("")
			const oldPasswordInput = ref(null)
			const newPasswordInput = ref(null)
			const newPasswordConfirmInput = ref(null)
			const loading = ref(false)

			/* Methods */
			const resetPassword = async (e) => {
				e.preventDefault()
				oldPasswordInput.value.validate()
				newPasswordInput.value.validate()
				newPasswordConfirmInput.value.validate()

				const isFormValid = !oldPassword.value.inputError && !newPassword.value.inputError && !newPasswordConfirm.value.inputError

				if(isFormValid) {
					try{
						await store.dispatch("resetPassword", { oldPassword: oldPassword.value, newPassword: newPassword.value })
						emit("update:modelValue", false)
					}catch(e) {}
				}
			}

			return {
				/* Datas */
				oldPassword,
				newPassword,
				newPasswordConfirm,
				oldPasswordInput,
				newPasswordInput,
				newPasswordConfirmInput,
				loading,
				/* Methods */
				resetPassword
			}
		}
	})
</script>