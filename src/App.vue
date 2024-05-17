<script setup>
import Navbar from "./widgets/Navbar/Navbar.vue";
import Sidebar from "./widgets/Sidebar/Sidebar.vue";
</script>

<template>
  <div class="d-flex ga-3">
    <Sidebar />
    <Navbar />
  </div>
  <router-view />
</template>

<style scoped></style>
