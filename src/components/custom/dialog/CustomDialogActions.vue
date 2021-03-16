<template>
  <div class="custom-dialog-actions">
	  <slot />
  </div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "CustomDialogActions"
  })
</script>