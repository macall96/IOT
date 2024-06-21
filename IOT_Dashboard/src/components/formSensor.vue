<script setup>
import {ref} from 'vue'
const props = defineProps(['nombre'])
const nombreSensor= ref('')
const emit  = defineEmits(['cerrar','agregar']);
</script>

<template>
 <div class="card mb-4" style="max-width: 18rem;">
  <div class="card-body">
    <form class="formDispositivo">
      <h5 class="card-title">Agregar sensor a <span class="nombreEspacio"> {{ props.nombre }} </span> </h5>
      <hr>
      <input type="text" v-model="nombreSensor" placeholder="Nombre del sensor">
      <br><br>
      <button class="btn btn-primary mb-2 me-2" @click.prevent="emit('agregar',nombreSensor)">Agregar sensor</button>
      <button class="btn btn-danger mb-2" @click.prevent="emit('cerrar')">Cerrar</button>
    </form>
   </div>
 </div>

</template>

<style>
</style>
