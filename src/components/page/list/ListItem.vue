<template>
  <article class="list-item">
    <div class="list-item__body">
	    <slot />
    </div>
  </article>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "ListItem"
  })
</script>