<template>
	<div class="custom-checkbox">
		<input type="checkbox" :checked="modelValue.includes(value)">
		<label v-if="leftLabel && !rightLabel" @click="checkcheckbox">{{ label }}</label>
		<div class="custom-checkbox__check" @click="checkcheckbox">
			<div class="custom-checkbox__check__inner" />
		</div>
		<label v-if="rightLabel" @click="checkcheckbox">{{ label }}</label>
	</div>
</template>

<script>
	import { computed, defineComponent } from "vue"
	import { normalize } from "../../../utils"

	export default defineComponent({
		name: "CustomCheckbox",
		props: {
			modelValue: {
				type: Array,
				default: () => []
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
				type: String,
				required: true
			},
			leftLabel: {
				type: Boolean,
				default: true
			},
			rightLabel: {
				type: Boolean,
				default: false
			}
		},
		setup(props, { emit }) {
			/* Methods */
			const checkcheckbox = async () => {
				if(props.modelValue.includes(props.value)) {
					props.modelValue.splice(props.modelValue.indexOf(props.value), 1)
				}else {
					props.modelValue.push(props.value)
				}

				emit("update:modelValue", props.modelValue)
			}

			return {
				/* Methods */
				checkcheckbox
			}
		}
	})
</script>
