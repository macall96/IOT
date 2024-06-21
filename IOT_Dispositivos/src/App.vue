<script setup>
import controladorDispositivo from './views/controladorDispositivo.vue';
import myFooter from './components/myFooter.vue'
</script>

<template>
<!-- Título -->
<div class="text-center py-3 bg-dark text-white">
  <img src="./assets/img/home-icon.png" alt="">
  <h1 class="fw-bold">IOT Devices</h1>
</div>

<controladorDispositivo></controladorDispositivo>
<router-view></router-view>
<myFooter></myFooter>
</template>

<style>
</style>
