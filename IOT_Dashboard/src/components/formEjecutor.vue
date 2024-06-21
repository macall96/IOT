<script setup>
import {ref} from 'vue';
const props = defineProps(['nombre']);
const emit  = defineEmits(['cerrar','agregar']);
const nombreEjecutor = ref('');
</script>

<template>
<div class="card mb-4" style="max-width: 18rem;">
    <div class="card-body">
     <form class="formDispositivo">
       <h5 class="card-title">Agregar ejecutor a <span class="nombreEspacio"> {{ props.nombre }} </span> </h5>
       <hr>
       <input type="text" v-model="nombreEjecutor" placeholder="Nombre del ejecutor">
       <br><br>
       <button class="btn btn-success mb-2 me-2"  @click.prevent="emit('agregar',nombreEjecutor)">Agregar ejecutor</button>
       <button class="btn btn-danger mb-2" @click.prevent="emit('cerrar')">Cerrar</button>
      </form>
    </div>
</div>
</template>

<style>

</style>
