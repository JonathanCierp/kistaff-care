<template>
  <q-page padding>
    <q-card
        bordered
        flat
        class="post">
        <q-card-section>
          <span
            class="text-blue text-h6">
            {{ post.title }}
          </span>

          <div class="row">
            <div class="text-grey col">
              <q-icon name="event" class="text-h6"/>
              <span class=" text-h8">{{ publishedAt }} </span>
            </div>

            <div class="text-grey text-right col">
              <q-icon name="chat" class="text-h6"/>
              <span class=" text-h8">{{ comments }} comments</span>
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <q-badge
            v-for="tag in tags"
            :key="tag"
            class="q-mr-xs q-pa-xs"
            color="text-blue"
            :label="tag" />
        </q-card-section>

        <q-separator inset />

        <q-card-section v-html="post.content"/>

        <q-separator inset />
    </q-card>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { makeGetMixin } from 'feathers-vuex'

export default {
  name: 'test-mixins',
  mixins: [
    makeGetMixin({
      service: 'posts'
    })
  ],
  computed: {
    postId () {
      return this.$route.params.id
    },
    publishedAt () {
      return date.formatDate(this.post.updatedAt, 'MMM DD, YYYY, hh:mm a.')
    },
    comments () {
      return 10
    },
    tags () {
      return ['IDE', 'Soins', 'Douleur']
    }
  }
}
</script>

<style scoped>
  .post {
    max-width:800px;
    margin:0px auto 20px auto
  }
</style>
