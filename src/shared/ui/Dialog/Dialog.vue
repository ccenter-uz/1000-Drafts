<style lang="scss"></style>
<script setup>
const props = defineProps({
  dialog: Boolean,
  width: String,
  title: String,
  subtitle: String,
});
</script>

<template>
  <v-dialog v-model="props.dialog" width="auto">
    <v-card
      :width="props.width"
      :title="props.title"
      :subtitle="props.subtitle"
    >
      <slot />
    </v-card>
  </v-dialog>
</template>
