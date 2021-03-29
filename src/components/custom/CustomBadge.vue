<template>
  <span class="custom-badge" :class="[typeClass]">
    <slot/>
		<span class="custom-badge__wrapper">
			<span class="custom-badge__badge" :style="[insetStyle]" aria-atomic="true" aria-label="Badge" aria-live="polite"
			      role="status">{{ content }}</span>
		</span>
  </span>
</template>

<script>
  import { defineComponent, computed } from "vue"

	export default defineComponent({
    name: "CustomBadge",
		props: {
			type: {
				type: String,
				default: "default"
			},
			inset: {
				type: [String, Number],
				default: "4"
			},
			content: {
				type: [String, Number],
				default: ""
			}
		},
		setup(props) {
			/* Computed */
			const typeClass = computed(() => props.type ? `custom-badge--${props.type}` : "")
			const insetStyle = computed(() => {
				return { inset: `auto auto calc(100% - ${props.inset}px) calc(100% - ${props.inset}px)` }
			})

			return {
				/* Computed */
				typeClass,
				insetStyle
			}
		}
  })
</script>
