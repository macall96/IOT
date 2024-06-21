<script setup>
const props = defineProps(['nombre','espacio','estado'])

</script>

<template>
  <div class="card" style="border: dotted 3px maroon;">
  <img src="../assets/img/iot-icon.png" class="card-img-top" alt="" style="width: 200px; height: auto; margin-top: 20px; margin-left: 10px;">
  <div class="card-body">
    <h5 class="card-title" >Ejecutor: <span class="tituloDestacado">{{ props.nombre }}</span></h5>
    <p class="card-text">Espacio: {{ props.espacio }}</p>
    <p class="card-text">Estado: {{ props.estado }}</p>
  </div>
</div> 

</template>