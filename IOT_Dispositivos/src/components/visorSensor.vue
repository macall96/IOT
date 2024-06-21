<script setup>
import { defineProps,defineEmits } from 'vue';

const props = defineProps(['nombre', 'espacio', 'valor']);
const emit = defineEmits(['cambiar']);

import { ref } from 'vue';

const nuevoValor = ref(null); // Valor seleccionado por defecto

</script>

<template>

<div class="card" style="border: dotted 3px maroon;">
  <img src="../assets/img/iot-icon.png" class="card-img-top" style="width: 200px; height: auto; margin-top: 20px; margin-left: 10px;">
  <div class="card-body">
    <h5 class="card-title" style="margin-left: 10px;">Sensor: <span class="tituloDestacado">{{ props.nombre }}</span> </h5>
    <br>
    <p class="card-text" style="margin-left: -3px;">Espacio: {{ props.espacio }}</p>
    <p class="card-text" style="margin-left: -3px;">Valor actual: {{ props.valor }}</p>
    <input type="text" v-model="nuevoValor" placeholder="Nuevo valor">
    <br><br>
    <a class="btn btn-primary" @click="emit('cambiar',nuevoValor)" style="margin-left: 25px;">Actualizar valor</a>
    
  </div>
</div> 


</template>
