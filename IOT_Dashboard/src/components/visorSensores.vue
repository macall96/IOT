<script setup>
const props = defineProps(['nombre','valor'])
const emit = defineEmits(['eliminar','ver'])
</script>

<template>
<div class="d-flex flex-row justify-content-center gap-3">
      <p> <span class="tituloDispositivo">{{ props.nombre }} </span> </p>
      <p>{{ props.valor }} </p>
      <button class="btnVerDispositivo" @click.prevent="emit('ver')">Acceder</button> 
      <button class="btnEliminarDispositivo" @click.prevent="emit('eliminar')">Eliminar</button> 
</div>
</template>

<style>

</style>
