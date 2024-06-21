<script setup>
const props = defineProps(['nombre'])
const emit  = defineEmits(['cambiaEjecutor', 'cambiaSensor','eliminar','cambiaNombre']);
</script>

<template>
     <div class="button-container">
    <button class="btn btn-primary me-2" @click.prevent="emit('cambiaSensor')">Agregar sensor</button>
    <button class="btn btn-success me-2" @click.prevent="emit('cambiaEjecutor')">Agregar ejecutor</button>
    <button class="btnRenombrarEspacio me-2" @click.prevent="emit('cambiaNombre')">Renombrar espacio</button>
    <button class="btn btn-danger" @click.prevent="emit('eliminar')">Eliminar espacio</button>

  </div>
</template>

<style>

</style>
