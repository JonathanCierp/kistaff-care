<template>
  <q-item :to="link" exact>
    <q-item-section avatar>
      <q-avatar size="56px"
        font-size="32px"
        text-color="white"
        :color="mission.iconColor"
        :icon="mission.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ mission.label }}
      </q-item-label>
      <q-item-label caption>
        {{ mission.message }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'MissionItem',
  props: ['mission'],
  computed: {
    link () {
      return '/missions/' + this.mission.Id
    }
  }
}
</script>

<style>
.image-map {
  width:100%;
}
</style>
