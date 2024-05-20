<script setup>
import Navbar from "../widgets/Navbar/Navbar.vue";
import Sidebar from "../widgets/Sidebar/Sidebar.vue";
import { sideLinks } from "./utils/links.js";
</script>

<template>
  <div class="w-100 d-flex">
    <!-- SIDEBAR -->
    <Sidebar
      :title="'1000'"
      :links="sideLinks"
      :logout="false"
      :handleLogout="null"
    />
    <div class="w-100 d-flex flex-column">
      <!-- NAVBAR -->
      <Navbar
        :title="'1000'"
        :links="sideLinks"
        :logout="false"
        :handleLogout="null"
      />
      <!-- CONTENT -->
      <div
        class="content container bg-white mx-3 my-3 h-100 elevation-1 rounded-lg"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
