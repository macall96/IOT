<script setup>
import {saveData} from '../utils/firebase';
import {ref} from 'vue';
const input = ref("")
const coleccion = 'espacios'

async function guardar () {
  try{
    saveData(coleccion,{nombre:input.value})
    alert("Espacio agregado con éxito.")
  } catch (e){
    console.log(e)
  }
};
</script>


<template>
<div class="body">
  <br><br>
    <form>
      <div class="form-group d-flex justify-content-center align-items-center gap-3">
        <input
          type="text"
          v-model="input"
          class="form-control mr-3"
          placeholder="Nombre del nuevo espacio"
          style="max-width: 18rem;"
        >
        <button type="submit" class="btn btn-success" @click.prevent="guardar">Crear espacio</button>
      </div>
    </form>
  </div>
</template>
