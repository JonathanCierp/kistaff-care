<template>
  <CustomDialog max-width="450px" transition="slide-down">
    <CustomDialogTitle :label="label" @close="$emit('update:modelValue', false)" />
    <CustomDialogBody>
      <CustomFileUpload v-model="files" />
    </CustomDialogBody>
    <CustomDialogActions>
      <CustomButton size="sm" text @click="$emit('update:modelValue', false)"
        >Fermer</CustomButton
      >
      <CustomButton
        :disabled="loading"
        :loading="loading"
        size="sm"
        @click="uploadDocument"
      >
        Télécharger
      </CustomButton>
    </CustomDialogActions>
  </CustomDialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "UploadDocumentDialog",
  props: {
    label: {
      type: String,
      default: "",
    },
    userDocuments: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const store = useStore();

    /* Datas */
    const loading = ref(false);
    const files = ref([]);
    files.value = props.userDocuments;

    /* Methods */
    const uploadDocument = async () => {
      try {
	      loading.value = true;
        for (let file of files.value) {
          if (file instanceof File) {
            uploadSingleDocuments(file);
          } else if (typeof file === "string") {
            await store.dispatch("deleteDocument", file);
          }
        }
      } finally {
        loading.value = false;
      }
    };
    const uploadSingleDocuments = (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const document = {
          Name: props.label + "-" + file.name, // Adeli-azoejkdpaoiezjfp
          ParentId: store.state.user.Id, // User id
          ContentType: file.type, // extension
          Description: props.label, // Type de doc
          Body: reader.result.replace(/^data:.+;base64,/, ""), // Encoder b64
        };
        try {
          const userDocument = store.getters.getDocumentByDescription(
            props.label
          );
          await store.dispatch("uploadDocument", { document, userDocument });
        } catch (e) {}
      };
    };

    return {
      /* Datas */
      loading,
      files,
      /* Methods */
      uploadDocument
    };
  },
});
</script>
