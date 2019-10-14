<template>
  <q-item :to="link" exact>
    <q-item-section avatar>
      <q-avatar size="56px"
        font-size="32px"
        text-color="white"
        :color="request.iconColor"
        :icon="request.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ request.label }}
      </q-item-label>
      <q-item-label caption>
        {{ request.message }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'RequestItem',
  props: ['request'],
  computed: {
    link () {
      return '/requests/' + this.request.Id
    }
  }
}
</script>

<style>
.image-map {
  width:100%;
}
</style>
