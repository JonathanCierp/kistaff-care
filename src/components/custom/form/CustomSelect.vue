<template>
	<div :style="[widthStyle]" class="custom-select">
		<label :for="label.toLowerCase().replace(' ', '-')">{{ label }}</label>
		<CustomDropdown ref="dropdown" :id="label.toLowerCase().replace(' ', '-')" :center="center" popover-width="100%"
		                icon-right="IconChevronDown" offset="0" text :disabled="disabled">
			<template #title>
				<span v-if="modelValue" class="custom-select__text">{{ dropdownTitle }}</span>
				<span v-else>{{ placeholder }}</span>
			</template>
			<template #popover>
				<ul ref="popoverItems" class="custom-select__popover">
					<li v-for="item in items" :key="item" :class="[selectClass(item)]"
					    class="custom-select__item" @click="onSelectOption($event, item)">
						<IconCheck />
						{{ item.value ? item.value : item }}
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
				type: [Object, String],
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
			multiple: {
				type: Boolean,
				default: false
			},
			disabled: {
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
			const dropdown = ref(null)

			/* Methods */
			const onSelectOption = (e, item) => {
				const element = e.target.closest("li")
				let tempItem = item.key ? item.key : item
				if(props.multiple) {
					element.classList.toggle("custom-select__item--active")
					if(props.modelValue) {
						if(props.modelValue.indexOf(tempItem) !== -1) {
							tempItem = props.modelValue.includes(";") ? props.modelValue.replace(tempItem + ";", "") : props.modelValue.replace(tempItem, "")
						}else {
							tempItem = props.modelValue + ";" + tempItem + ";"
						}
					}

					if(tempItem === ";") {
						tempItem = null
					}

					emit("update:modelValue", tempItem)
				}else {
					Array.from(popoverItems.value.children).forEach(item => item.classList.remove("custom-select__item--active"))
					element.classList.add("custom-select__item--active")
					dropdown.value.closeDropdown()
					emit("update:modelValue", tempItem)
				}
			}
			const selectClass = (item) => {
				const tempItem = item.key ? item.key : item
				
				if(props.multiple) {
					return props.modelValue && props.modelValue.indexOf(tempItem) !== -1 ? 'custom-select__item--active' : ''
				}

				return tempItem === props.modelValue ? 'custom-select__item--active' : ''
			}

			/* Computed */
			const widthStyle = computed(() => {
				return { width: props.width }
			})
			const dropdownTitle = computed(() => {
				const itemValue = props.items.find(item => item.key === props.modelValue)
				let modelValue = itemValue ? itemValue.value : props.modelValue

				if(props.multiple) {
					modelValue = ""
					const tempItems = props.modelValue.split(";")
					tempItems.forEach(tempItem => {
						modelValue += props.items.find(item => item.key === tempItem) ? `${props.items.find(item => item.key === tempItem).value}, ` : ""
					})

					modelValue = modelValue.slice(0, -2)
				}

				return modelValue
			})

			return {
				/* Datas */
				popoverItems,
				dropdown,
				/* Methods */
				onSelectOption,
				selectClass,
				/* Computed */
				widthStyle,
				dropdownTitle
			}
		}
	})
</script>
