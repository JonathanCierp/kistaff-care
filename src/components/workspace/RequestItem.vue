<template>
  <q-item clickable v-ripple>
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
  props: ['request']
}
</script>

<style>
.image-map {
  width:100%;
}
</style>
