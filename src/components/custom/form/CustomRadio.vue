<template>
	<div class="custom-radio">
		<input type="radio" :checked="modelValue === value">
		<label v-if="leftLabel && !rightLabel" @click="checkRadio">{{ label }}</label>
		<div class="custom-radio__check" @click="checkRadio">
			<div class="custom-radio__check__inner" />
		</div>
		<label v-if="rightLabel" @click="checkRadio">{{ label }}</label>
	</div>
</template>

<script>
	import { computed, defineComponent, ref } from "vue"
	import { normalize } from "../../../utils"

	export default defineComponent({
		name: "CustomRadio",
		props: {
			modelValue: {
				type: String,
				default: ""
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
		emits: ["update:modelValue"],
		setup(props, { emit }) {
			/* Methods */
			const checkRadio = () => {
				emit("update:modelValue", props.value)
			}

			return {
				/* Methods */
				checkRadio
			}
		}
	})
</script>
