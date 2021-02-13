<template>
  <main class="documents">
	  <PageHeader label="Mes documents" />
  </main>
</template>

<script>
  import { defineComponent } from "vue"
  import PageHeader from "../components/page/PageHeader.vue"

	export default defineComponent({
    name: "Documents",
		components: {
			PageHeader
		}
  })
</script>