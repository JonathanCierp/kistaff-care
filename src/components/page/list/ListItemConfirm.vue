<template>
	<div class="list-item-confirm__meta">
		<h2>IDE - Gériatire</h2>
		<p>{{ previewPlace }}</p>
		<div>
			<p>Dimanche 7 février</p>
			<p>8h - 20h</p>
		</div>
	</div>
	<div class="list-item-confirm__actions">
		<CustomButton text type="success" block>Accepter</CustomButton>
		<CustomButton text type="error" block>Refuser</CustomButton>
	</div>
</template>

<script>
  import { defineComponent, computed } from "vue"

	export default defineComponent({
    name: "ListItemConfirm",
		setup: () => {
    	/* Computed */
			const previewPlace = computed(() => window.innerWidth >= 1100 ||  window.innerWidth <= 500 ? "EHPAD La Maison Saint Charles Charles".substr(0, 20) + "..." : "EHPAD La Maison Saint Charles Charles")

			return {

				/* Computed */
				previewPlace
			}
		}
  })
</script>