<style src="./style.scss" lang="scss" />
<script setup>
const props = defineProps({
  links: Array,
  title: String,
  logout: Boolean,
  handleLogout: Function,
});
</script>

<template>
  <aside class="sidebar">
    <v-list-item class="list-title">{{ title }}</v-list-item>
    <v-divider class="my-2" />
    <div style="height: 85%">
      <v-list class="list" v-if="links" v-for="link in props.links">
        <v-list-item
          density="compact"
          link
          :to="link.path || '/'"
          class="list-item"
          :prepend-icon="link.icon"
          >{{ link.title || "Title is missing" }}
        </v-list-item>
      </v-list>
    </div>
    <v-btn v-if="logout" class="logout w-100 bg-error" @click="handleLogout"
      >Log out</v-btn
    >
    <p class="text-reserve text-center my-3 text-caption text-grey">
      All rights reserved
    </p>
  </aside>
</template>
