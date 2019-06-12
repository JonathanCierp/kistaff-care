<template>
  <q-card
    bordered
    flat>
    <q-card-section>
      <a
        class="text-blue text-h6"
        :href="link">
        {{ post.title }}
      </a>

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

    <q-card-section>
      {{ post.summary }}
      <a :href="link" class="text-blue">
        (more)
      </a>
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
  </q-card>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PostItem',
  props: ['post'],
  computed: {
    tags () {
      return ['IDE', 'Soins', 'Douleur']
    },
    publishedAt () {
      return date.formatDate(this.post.updatedAt, 'MMM DD, YYYY, hh:mm a.')
    },
    link () {
      return '#/posts/' + this.post.id
    },
    comments () {
      return 10
    }
  }
}
</script>

<style>
</style>
