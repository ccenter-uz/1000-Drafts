<style src="./style.scss" lang="scss" />
<script setup>
import { ref } from "vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import Home from "vue-material-design-icons/Home.vue";
import Logout from "vue-material-design-icons/Logout.vue";

// props
const props = defineProps({
  links: Array,
  title: String,
  logout: Boolean,
  handleLogout: Function,
});
const openDrawer = ref(false);
</script>

<template>
  <div class="nav d-flex justify-space-between align-center">
    <Home @click="$router.push('/')" />
    <MenuIcon
      @click="openDrawer = !openDrawer"
      class="menu-hamburger cursor-pointer"
      :size="24"
    />
  </div>
  <v-layout>
    <v-navigation-drawer v-model="openDrawer" temporary :width="400">
      <h2 class="text-center py-2">{{ title }}</h2>
      <v-divider class="mb-2" />
      <div style="height: 84%">
        <v-list class="list" v-for="link in links">
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
      <div v-if="logout" class="w-100 d-flex align-start justify-center">
        <Logout style="color: crimson" @click="handleLogout" />
        <p
          @click="handleLogout"
          aria-role="button"
          class="text-error cursor-pointer ml-2"
        >
          Log out
        </p>
      </div>
      <p class="text-reserve text-center mb-3 mt-2 text-caption text-grey">
        All rights reserved
      </p>
    </v-navigation-drawer>
  </v-layout>
</template>
