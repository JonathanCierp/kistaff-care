<template>
	<div :style="[widthStyle]" class="custom-input" :class="inputErrorClass">
		<label :for="`${label.toLowerCase().replace(' ', '-')}-${guid}`">{{ label }}</label>
		<input :id="`${label.toLowerCase().replace(' ', '-')}-${guid}`" :placeholder="placeholder" :type="nativeType"
		       @blur="onBlur" :value="modelValue" />
		<p v-if="inputError" class="custom-input__error-message">
			<IconWarning />
			{{ errorMessage }}
		</p>
	</div>
</template>

<script>
	import { computed, defineComponent, ref, nextTick } from "vue"
	import { getUid } from "../../../utils"

	export default defineComponent({
		name: "CustomInput",
		props: {
			modelValue: {
				type: String,
				default: ""
			},
			nativeType: {
				type: String,
				default: "text"
			},
			width: {
				type: String,
				default: ""
			},
			placeholder: {
				type: String,
				default: ""
			},
			label: {
				type: String,
				default: ""
			},
			required: {
				type: Boolean,
				default: false
			},
			rules: {
				type: Array,
				default: () => []
			}
		},
		emits: ["update:modelValue"],
		setup: (props , { emit }) => {
			/* Datas */
			const errorMessage = ref("")
			const inputError = ref(false)
			const inputValue = ref("")
			const guid = ref(getUid())

			/* Methods */
			const onBlur = async (e) => {
				const v = e.target.value

				emit("update:modelValue", v)
				await nextTick()
				validate(v)
			}

			const validate = (v = null) => {
				let value = v ? v : props.modelValue

				if(props.required) {
					for(let rule of props.rules) {
						if(typeof rule(value) === "string") {
							errorMessage.value = rule(value)
							inputError.value = true
							break
						} else {
							inputError.value = false
						}
					}
				}

				return !inputError.value
			}

			/* Computed */
			const widthStyle = computed(() => {
				return { width: props.width }
			})

			const inputErrorClass = computed(() => inputError.value ? "custom-input--error" : "")

			return {
				/* Datas */
				errorMessage,
				inputError,
				inputValue,
				guid,
				/* Methods */
				onBlur,
				validate,
				/* Computed */
				widthStyle,
				inputErrorClass
			}
		}
	})
</script>
