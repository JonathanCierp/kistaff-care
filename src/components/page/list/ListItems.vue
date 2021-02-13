<template>
  <div class="list-items">
    <slot />
  </div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "ListItems"
  })
</script>