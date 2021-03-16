<template>
  <section class="custom-file-upload" @drop.prevent="addFileToUpload" @dragover.prevent>
	  <h2 class="font-medium text-h4">Glissez et déposez</h2>
	  <p class="text-h5">votre fichier ici</p>
	  <p class="custom-file-upload__or text-body-1">ou</p>
	  <form id="test">
		  <input ref="inputFile" type="file" @change="addFileToUpload">
	  </form>
	  <div v-if="file.value" class="custom-file-upload__file">
		  <span>{{ file.value.name }}</span>
		  <IconTrash @click="removeFile" />
	  </div>
	  <CustomButton v-else size="sm" @click="inputFile.click()">Joindre un fichier</CustomButton>
  </section>
</template>

<script>
	import { defineComponent, reactive, ref } from "vue"

	export default defineComponent({
    name: "CustomFileUpload",
		setup(props, { emit }) {
    	/* Datas */
			const inputFile = ref(null)
			const file = reactive({})

    	/* Methods */
    	const addFileToUpload = (e) => {
    		if(!file.value) {
			    let event = e.dataTransfer || e.target
			    file.value = event.files[0]

			    emit("update:modelValue", file.value)
		    }
	    }
    	const removeFile = (e) => {
		    inputFile.value.value = ""
		    file.value = null
	    }

	    return {
		    /* Datas */
		    inputFile,
		    file,
		    /* Methods */
		    addFileToUpload,
		    removeFile
	    }
		}
  })
</script>