<template>
	<div class="custom-checkbox">
		<input type="checkbox" :checked="checked">
		<label v-if="leftLabel && !rightLabel" @click="checkcheckbox">{{ label }}</label>
		<div class="custom-checkbox__check" @click="checkcheckbox">
			<div class="custom-checkbox__check__inner" />
		</div>
		<label v-if="rightLabel" @click="checkcheckbox">{{ label }}</label>
	</div>
</template>

<script>
	import { computed, defineComponent, ref } from "vue"

	export default defineComponent({
		name: "CustomCheckbox",
		props: {
			modelValue: {
				type: [Array, String, Number, Boolean]
			},
			label: {
				type: String,
				default: ""
			},
			name: {
				type: String,
				default: ""
			},
			value: {
				type: String
			},
			leftLabel: {
				type: Boolean,
				default: true
			},
			rightLabel: {
				type: Boolean,
				default: false
			},
			trueValue: {
				type: String,
				default: ""
			},
			falseValue: {
				type: String,
				default: ""
			}
		},
		setup(props, { emit }) {
			/* Datas */
			const checked = ref(props.modelValue === props.trueValue || props.modelValue.includes(props.value))
			/* Methods */
			const checkcheckbox = async () => {
				if(props.trueValue || props.falseValue) {
					checked.value = props.modelValue === props.falseValue
					emit("update:modelValue", props.modelValue === props.trueValue ? props.falseValue : props.trueValue)
				}else {
					if(props.modelValue.includes(props.value)) {
						props.modelValue.splice(props.modelValue.indexOf(props.value), 1)
					}else {
						props.modelValue.push(props.value)
					}

					checked.value = props.modelValue.includes(props.value)
					emit("update:modelValue", props.modelValue)
				}
			}

			return {
				/* Datas */
				checked,
				/* Methods */
				checkcheckbox
			}
		}
	})
</script>
