<script setup>
import visorSensor from '../components/visorSensor.vue';
import visorEjecutor from '../components/visorEjecutor.vue';
import { onMounted, ref } from 'vue';
import { router } from '@/router/index';
import {getDataChanged_document,updateData} from '@/utils/firebase'; // Importa la instancia de Firestore desde tu archivo firebase.js

const id = ref(null); // Define id como una referencia
const documento = ref(null); // Variable para almacenar los datos del documento de Firestore

// Carga el documento cuando la ID cambia
onMounted(async () => {
  id.value = router.currentRoute.value.params.id;
  if(id.value){
    await cargarDocumento();
  }
});

//Función que carga y muestra la información desde Firebase a través de su ID, recuperada desde la URL 
//En función del inicio del nombre del dispositivo, se sabe si es un sensor o un ejecutor y muestra la info con el componente visor correspondiente
const cargarDocumento = async () => {
  try {

    if(id.value.startsWith('sen')){
      getDataChanged_document('sensores', id.value, (docSnapshot) => {
        if (docSnapshot.exists()) {
          documento.value = docSnapshot.data();
        } else {
          documento.value = null;
        }
      });
    } else {
      getDataChanged_document('ejecutores', id.value, (docSnapshot) => {
        if (docSnapshot.exists()) {
          documento.value = docSnapshot.data();
        } else {
          documento.value = null;
        }
      });
    }
  } catch (error) {
    console.error('Error al cargar el documento:', error);
  }
}

//Función para cambiar el valor de un sensor 
const cambiaValor = async (nuevoValor) => {
  try {
    await updateData(id.value,'sensores',{valor:nuevoValor});
    alert(`Valor del sensor ${id.value} actualizado correctamnete.`);
  } catch (error) {
    console.error(`Error al actualizar el campo "valor" en el documento ${id.value}. Error: `, error);
}
}
</script>


<template>
<div class="body">
  <div style="display: flex; flex-direction: row; align-items: center;">
    <!-- Verifica si el id comienza con "sen" -->
    <visorSensor
      v-if="id && id.startsWith('sen')"
      :nombre="documento.nombre"
      :espacio="documento.espacio" 
      :valor="documento.valor"
      @cambiar="cambiaValor($event)"
    ></visorSensor>

    <!-- Verifica si el id comienza con "eje" -->
    <visorEjecutor 
      v-else-if="id && id.startsWith('eje')"
      :nombre="documento.nombre" 
      :espacio="documento.espacio" 
      :estado="documento.estado"
    ></visorEjecutor>
  </div>
</div>
</template>
