<template>
  <footer class="core-footer">
		<p class="core-footer__copyright">© Copyright Kistaff 2018-2021. Tous droits résevés</p>
	  <p class="core-footer__links">
		  <a href="https://www.kistaff.fr/s/legal?language=fr" target="_blank">
			  Mentions légales
		  </a>
		  |
		  <a href="https://www.kistaff.fr/s/terms?language=fr" target="_blank">
			  Conditions générales
		  </a>
		  |
		  <a href="https://www.kistaff.fr/s/privacy?language=fr" target="_blank">
			  Politique de confidentialité
		  </a>
	  </p>
  </footer>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "CoreFooter"
  })
</script>