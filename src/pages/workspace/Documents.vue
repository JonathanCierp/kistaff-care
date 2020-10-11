<template>
  <q-page>
    <q-card flat>
      <div class="content-wrapper">
        <div class="main-content">
          <q-card-section>
            <p>
              👋 Afin de finaliser votre dossier et faire partie de officiellement de nos effectifs,
              merci de nous transmettre vos documents👇
            </p>
            <q-select v-if="documentsSize < 30"
              v-model="docType"
              :options="docTypes"
              :label="this.$t('labels.doc_type')"
              @input="val => {docTypeChanged(val)}"/>

            <q-uploader v-if="docType"
              ref='docUpload'
              hide-upload-btn
              style="width: 100%;"
              :label="docType"
              @added="docsAdded"/>
          </q-card-section>

          <q-card-section>
            <q-table
              row-key="Id"
              :title="this.$t('labels.uploaded_documents')"
              :columns="docColumns"
              :rows-per-page-options="[20]"
              :data="documents">
               <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn
                    icon-right="cloud_download"
                    no-caps
                    flat
                    dense
                    @click="downloadDocument(documents.indexOf(props.row))"
                  />
                  <q-btn
                  color="danger"
                  icon-right="delete"
                  no-caps
                  flat
                  dense
                  @click="deleteDocument(documents.indexOf(props.row))"
                />
        </q-td>
      </template>
            </q-table>
          </q-card-section>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import Vue from 'vue'
import { makeFindMixin } from 'feathers-vuex'

export default {
  name: 'Documents',
  mixins: [
    makeFindMixin({ service: 'documents' })
  ],
  computed: {
    documentsParams () {
      return {
        query: {
          $sort: {
            Id: -1
          }
        },
        paginate: false
      }
    },
    documentsSize () {
      let size = 0
      this.documents.forEach(document => {
        size += document.BodyLength
      })

      return size / 1024 / 1024
    }
  },
  methods: {
    docTypeChanged (value) {
      if (this.$refs.docUpload) {
        this.$refs.docUpload.reset()
      }
    },
    docsAdded (files) {
      this.$q.loading.show()

      let reader = new FileReader()

      reader.onload = () => {
        let loggedUser = this.$store.state.auth.user
        const { Document } = this.$FeathersVuex.api
        let newDocument = new Document({
          Name: this.docType + '-' + files[0].name,
          ParentId: loggedUser.ContactId,
          ContentType: files[0].type,
          Description: this.docType,
          Body: reader.result.replace(/^data:.+;base64,/, '')
        })

        newDocument.save().then(res => {
          this.docType = null
          this.$q.loading.hide()

          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'check_circle_outline',
            message: this.$i18n.t('notification.documentSaved')
          })
        }).catch(err => {
          this.docType = null
          this.$q.loading.hide()

          Vue.config.errorHandler(err)
        })
      }

      reader.readAsDataURL(files[0])
    },
    deleteDocument (index) {
      this.$q.dialog({
        title: this.$i18n.t('messages.confirm'),
        message: this.$i18n.t('messages.delete_confirmation'),
        ok: this.$i18n.t('buttons.submit'),
        cancel: this.$i18n.t('buttons.cancel')
      }).onOk(() => {
        this.$q.loading.show()

        let document = this.documents[index]
        document.remove().then(res => {
          this.$q.loading.hide()
        }).catch(err => {
          this.$q.loading.hide()
          Vue.config.errorHandler(err)
        })
      })
    },
    downloadDocument  (index) {
      const { ContentFile } = this.$FeathersVuex.api
      ContentFile.get(this.documents[index].Id).then(content => {
        let fileUrl = 'data:' + content.ContentType + ';base64,' + content.Body
        fetch(fileUrl)
          .then(response => response.blob())
          .then(blob => {
            let donwloadLink = window.document.createElement('a')
            donwloadLink.href = window.URL.createObjectURL(blob, { type: content.ContentType })
            donwloadLink.download = content.Name
            donwloadLink.click()
          })
      })
    }
  },
  data () {
    return {
      docType: null,
      docTypes: [
        'Carte d\'identité',
        'Justificatif de domicile',
        'Casier judiciaire',
        'Carte vitale',
        'Vaccinations',
        'RIB',
        'CV',
        'Diplôme',
        'Attestation ADELI',
        'Carte professionnelle',
        'Attestation AFGSU'
      ],
      docColumns: [
        {
          name: 'Name',
          field: 'Name',
          label: 'Nom du document',
          align: 'left',
          sortable: true
        },
        {
          name: 'action',
          label: 'Action',
          field: 'action'
        }
      ]
    }
  }
}
</script>

<style>
</style>
