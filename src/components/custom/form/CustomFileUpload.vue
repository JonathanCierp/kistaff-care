<template>
	<section class="custom-file-upload" @drop.prevent="addFileToUpload" @dragover.prevent>
		<h2 class="font-medium text-h4">Glissez et déposez</h2>
		<p class="text-h5">votre fichier ici</p>
		<p class="custom-file-upload__or text-body-1">ou</p>
		<form id="test">
			<input ref="inputFile" multiple type="file" @change="addFileToUpload">
		</form>
		<div v-for="file in files.value.filter(tempFile => typeof tempFile === 'object')" :key="file.name"
		     class="custom-file-upload__file">
			<span>{{ file.name || file.Name }}</span>
			<IconTrash @click="removeFile(file.Id)" />
		</div>
		<CustomButton v-if="!files.value.find(tempFile => typeof tempFile === 'object')" size="sm"
		              @click="inputFile.click()">Joindre un fichier
		</CustomButton>
	</section>
</template>

<script>
	import { defineComponent, reactive, ref } from "vue"

	export default defineComponent({
		name: "CustomFileUpload",
		props: {
			modelValue: {
				type: Array
			}
		},
		emits: ["update:modelValue"],
		setup(props, { emit }) {
			/* Datas */
			const inputFile = ref(null)
			const files = reactive([])
			files.value = props.modelValue

			/* Methods */
			const addFileToUpload = (e) => {
				let event = e.dataTransfer || e.target

				for(let file of Array.from(event.files)) {
					files.value.push(file)
				}

				emit("update:modelValue", files.value)
			}
			const removeFile = (id) => {
				inputFile.value.value = ""
				const file = files.value.find(file => file.Id === id)
				const fileIndex = files.value.indexOf(file)
				files.value[fileIndex] = file.Id
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
