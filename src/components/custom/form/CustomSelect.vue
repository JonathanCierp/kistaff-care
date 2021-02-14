<template>
	<div :style="[widthStyle]" class="custom-select">
		<label :for="label.toLowerCase().replace(' ', '-')">{{ label }}</label>
		<CustomDropdown :id="label.toLowerCase().replace(' ', '-')" :popover-width="width" icon-left="IconChevronDown" offset="0" text>
			<template #title>
				<span v-if="optionTextSelected" class="custom-select__text">{{ optionTextSelected }}</span>
				<span v-else>{{ placeholder }}</span>
			</template>
			<template #popover>
				<ul ref="popoverItems" class="custom-select__popover">
					<li v-for="i in 5" :key="i" class="custom-select__item" :class="i === optionSelected ? 'custom-select__item--active' : ''" @click="onSelectOption($event, i)">
						<IconCheck />
						Option {{ i }}
					</li>
				</ul>
			</template>
		</CustomDropdown>
	</div>
</template>

<script>
	import { defineComponent, computed, ref } from "vue"

	export default defineComponent({
		name: "CustomSelect",
		props: {
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
			}
		},
		setup: (props) => {
			/* Datas */
			const popoverItems = ref(null)
			const optionSelected = ref(null)
			const optionTextSelected = ref(null)

			/* Methods */
			const onSelectOption = (e, i) => {
				const element = e.target.closest("li")
				Array.from(popoverItems.value.children).forEach(item => item.classList.remove("custom-select__item--active"))
				element.classList.add("custom-select__item--active")
				optionTextSelected.value = element.innerText
				optionSelected.value = i
			}

			/* Computed */
			const widthStyle = computed(() => {
				return { width: props.width }
			})

			return {
				/* Datas */
				popoverItems,
				optionSelected,
				optionTextSelected,
				/* Methods */
				onSelectOption,
				/* Computed */
				widthStyle
			}
		}
	})
</script>