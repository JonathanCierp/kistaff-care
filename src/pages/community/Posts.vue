<template>
  <q-page padding>
       <post-item
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="post-item"/>
  </q-page>
</template>

<script>
import { makeFindMixin } from 'feathers-vuex'
import PostItem from '../../components/community/PostItem'

export default {
  name: 'Posts',
  components: {
    'post-item': PostItem
  },
  mixins: [
    makeFindMixin({ service: 'posts' })
  ],
  computed: {
    postsParams () {
      return { query: {} }
    }
  }
}
</script>

<style>
  .post-item {
    max-width:800px;
    margin:0px auto 20px auto
  }
</style>
