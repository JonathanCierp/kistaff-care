<template>
	<CustomButton class="custom-floating-button" floating rounded="full">
        <slot />
    </CustomButton>
</template>

<script>
	import { defineComponent } from "vue"

	export default defineComponent({
		name: "CustomFloatingButton",

    })
</script>