<template>
  <section class="custom-file-upload" @drop.prevent="addFileToUpload" @dragover.prevent>
	  <h2 class="font-medium text-h4">Glissez et déposez</h2>
	  <p class="text-h5">votre fichier ici</p>
	  <p class="custom-file-upload__or text-body-1">ou</p>
	  <form id="test">
		  <input ref="inputFile" type="file" multiple @change="addFileToUpload">
	  </form>
	  <div v-for="file in files.value" :key="file.name" class="custom-file-upload__file">
		  <span>{{ file.name }}</span>
		  <IconTrash @click="removeFile(file)" />
	  </div>
	  <CustomButton v-if="!files.value" size="sm" @click="inputFile.click()">Joindre un fichier</CustomButton>
  </section>
</template>

<script>
	import { defineComponent, reactive, ref } from "vue"

	export default defineComponent({
    name: "CustomFileUpload",
		setup(props, { emit }) {
    	/* Datas */
			const inputFile = ref(null)
			const files = reactive([])

    	/* Methods */
    	const addFileToUpload = (e) => {
		    let event = e.dataTransfer || e.target
		    files.value = Array.from(event.files)

		    emit("update:modelValue", files.value)
	    }
    	const removeFile = (file) => {
		    inputFile.value.value = ""
		    files.value = files.value.find(tempFile => tempFile !== file)
	    }

	    return {
		    /* Datas */
		    inputFile,
		    files,
		    /* Methods */
		    addFileToUpload,
		    removeFile
	    }
		}
  })
</script>