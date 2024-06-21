<script setup>
import {ref} from 'vue'
const props = defineProps(['nombre','estado'])
const emit = defineEmits(['cambiar','eliminar','ver'])
const isChecked = ref(props.estado=='Encendido'? true : false);

// Manejar el cambio en el estado del checkbox
const manejarCambioCheckbox = () => {
  emit('cambiar', isChecked.value);
}
</script>

<template>
  <div class="d-flex flex-row justify-content-center gap-3">
    <p> <span class="tituloDispositivo">{{ props.nombre}}</span> </p>
    <div class="form-check form-switch d-flex justify-content-center">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="isChecked" @change="manejarCambioCheckbox" />
    </div>
    <button class="btnVerDispositivo" @click.prevent="emit('ver')">Acceder</button> 
    <button class="btnEliminarDispositivo" @click.prevent="emit('eliminar')">Eliminar</button>  
  </div>
</template>

<style>

</style>