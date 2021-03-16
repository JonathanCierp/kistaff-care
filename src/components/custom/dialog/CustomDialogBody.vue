<template>
  <div class="custom-dialog-body">
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "CustomDialogBody"
  })
</script>