<template>
  <article class="list-item">
    <slot />
  </article>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "ListItem"
  })
</script>