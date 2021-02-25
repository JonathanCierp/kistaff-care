<template>
	<div :style="[widthStyle]" class="custom-select">
		<label :for="label.toLowerCase().replace(' ', '-')">{{ label }}</label>
		<CustomDropdown :id="label.toLowerCase().replace(' ', '-')" :center="center" :popover-width="width"
		                icon-left="IconChevronDown" offset="0" text>
			<template #title>
				<span v-if="modelValue" class="custom-select__text">{{ modelValue }}</span>
				<span v-else>{{ modelValue }}</span>
			</template>
			<template #popover>
				<ul ref="popoverItems" class="custom-select__popover">
					<li v-for="item in items" :key="item" :class="item === modelValue ? 'custom-select__item--active' : ''"
					    class="custom-select__item" @click="onSelectOption($event, item)">
						<IconCheck />
						{{ item }}
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
			center: {
				type: Boolean,
				default: false
			},
			items: {
				type: Array,
				default: []
			}
		},
		setup: (props, { emit }) => {
			/* Datas */
			const popoverItems = ref(null)

			/* Methods */
			const onSelectOption = (e, item) => {
				const element = e.target.closest("li")
				Array.from(popoverItems.value.children).forEach(item => item.classList.remove("custom-select__item--active"))
				element.classList.add("custom-select__item--active")
				emit("update:modelValue", item)
			}

			/* Computed */
			const widthStyle = computed(() => {
				return { width: props.width }
			})

			return {
				/* Datas */
				popoverItems,
				/* Methods */
				onSelectOption,
				/* Computed */
				widthStyle
			}
		}
	})
</script>