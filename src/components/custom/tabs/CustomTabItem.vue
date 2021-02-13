<template>
  <div class="custom-tab-item">
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "CustomTabItem"
  })
</script>