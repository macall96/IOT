<script setup>
import {ref} from 'vue'
const props = defineProps(['nombre'])
const nuevoNombre = ref('')
const emit  = defineEmits(['cerrar','cambiar']);
</script>

<template>
 <div class="card mb-4" style="max-width: 18rem;">
  <div class="card-body">
    <form class="formDispositivo">
      <h5 class="card-title">Cambiar nombre a <span class="nombreEspacio"> {{ props.nombre }} </span> </h5>
      <hr>
      <input type="text" v-model="nuevoNombre" placeholder="Nuevo nombre">
      <br><br>
      <button class="btn btn-primary mb-2 me-2" @click.prevent="emit('cambiar',nuevoNombre)">Cambiar nombre</button>
      <button class="btn btn-danger mb-2" @click.prevent="emit('cerrar')">Cerrar</button>
    </form>
   </div>
 </div>

</template>

<style>
</style>
