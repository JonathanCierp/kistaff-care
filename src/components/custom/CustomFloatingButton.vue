<template>
	<CustomButton class="custom-floating-button" floating rounded="full" style="min-width: auto;width: 4.5rem;height: 4.5rem;z-index: 1;">
        <slot />
    </CustomButton>
</template>

<script>
	import { defineComponent } from "vue"

	export default defineComponent({
		name: "CustomFloatingButton",

    })
</script>