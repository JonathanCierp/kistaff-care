<template>
  <div class="custom-input">
	  <label for="nom">Nom</label>
	  <input id="nom" :type="nativeType" placeholder="Placeholder text" />
  </div>
</template>

<script>
  import { defineComponent } from "vue"

	export default defineComponent({
    name: "CustomInput",
		props: {
    	nativeType: {
    		type: String,
		    default: "text"
	    }
		}
  })
</script>