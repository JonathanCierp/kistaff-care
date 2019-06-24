<template>
  <q-card
    bordered
    flat>
    <q-card-section>
      <a
        class="text-blue text-h6"
        :href="post.link">
        {{ post.title }}
      </a>

      <div class="row">
        <div class="text-grey col">
          <q-icon name="event" class="text-h6"/>
          <span class=" text-h8">{{ post.publishedAt }} </span>
        </div>

        <div class="text-grey text-right col">
          <q-icon name="chat" class="text-h6"/>
          <span class=" text-h8">{{ post.nbComments }} comments</span>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      {{ post.summary }}
      <a :href="post.link" class="text-blue">
        (more)
      </a>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <q-badge
        v-for="tag in post.tagList"
        :key="tag"
        class="q-mr-xs q-pa-xs"
        color="text-blue"
        :label="tag" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'PostItem',
  props: ['post']
}
</script>

<style>
</style>
