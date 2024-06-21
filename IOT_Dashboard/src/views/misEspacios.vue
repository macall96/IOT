<script setup>
import {db,deleteData,cambiaEstadoEjecutor,cambiarNombreEspacio,listenToDataCollection,eliminarEjecutoresEspacio,eliminarSensoresEspacio} from '../utils/firebase';
import {collection,doc,setDoc} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
import visorEspacios  from '@/components/visorEspacios.vue';
import { ref, onMounted } from 'vue';
import formSensor from '../components/formSensor.vue'
import formEjecutor from '../components/formEjecutor.vue'
import formEditarNombre from '@/components/formEditarNombre.vue';
import visorEjecutores from '@/components/visorEjecutores.vue';
import visorSensores from '@/components/visorSensores.vue';

const espacios = 'espacios';
const sensores = 'sensores';
const ejecutores = 'ejecutores';
const arrayEspacios = ref([]);
const arraySensores = ref([]);
const arrayEjecutores = ref([]);

const anadirSensor = ref(false)
const anadirEjecutor = ref(false)
const cambiarNombre = ref(false)
const nombreEspacio = ref(null)
const espacioSeleccionado = ref(null)
const formSensorRef = ref(null)
const formEjecutorRef = ref(null)

//Carga inicial de los arrays de espacios, sensores y ejecutores con los datos obtenidos de Firebase 
onMounted(() => {
    // Obtener los documentos de las colecciones espacios, sensores y ejecutores al cargar el componente
    const espaciosUnsubscribe = listenToDataCollection('espacios', (data) => {
        arrayEspacios.value = data;
    });

    const sensoresUnsubscribe = listenToDataCollection('sensores', (data) => {
        arraySensores.value = data;
    });

    const ejecutoresUnsubscribe = listenToDataCollection('ejecutores', (data) => {
        arrayEjecutores.value = data;
    });

    // Devuelve una función de limpieza para dejar de escuchar los cambios cuando el componente se destruya
    return () => {
        espaciosUnsubscribe();
        sensoresUnsubscribe();
        ejecutoresUnsubscribe();
    };
});
//Función que se activa cuando pulsamos al botón para añadir un sensor a un espacio
const manejarCambioSensor = (nombre, infoEspacio) => {
  anadirSensor.value = true; //cambiamos este boolean a true para que aparezca el form para añadir un sensor
  nombreEspacio.value = nombre; //guardamos en una variable global reactiva el nombre del espacio con el que trabajamos
  espacioSeleccionado.value = infoEspacio; //guardamos en una variable global reactiva el id del espacio con el que trabajamos 
};

//Función que se activa cuando pulsamos al botón para añadir un ejecutor a un espacio
const manejarCambioEjecutor = (nombre, infoEspacio) => {
  anadirEjecutor.value = true;  //cambiamos este boolean a true para que aparezca el form para añadir ejecutor
  nombreEspacio.value = nombre; 
  espacioSeleccionado.value = infoEspacio;
};

//Función que se activa cuando pulsamos un botón de cambiar nombre
const manejarCambioNombre = (nombre, infoEspacio) => {
   cambiarNombre.value=true; //cambiamos este boolean a true para que aparezca el form para cambiar el nombre del espacio
   nombreEspacio.value = nombre;
   espacioSeleccionado.value = infoEspacio;
 };

const agregarSensor = async (nombreSensor, nombreEspacio) => {
  try {
    
     const coleccionSensores = collection(db, sensores);

     // Generar un ID personalizado que comience con "sen"
     const sensorId = "sen" + Math.random().toString(36).substr(2, 10);

     const sensorData = {
      nombre: nombreSensor,
      espacio: nombreEspacio,
      valor: 0
     };

     // Crea una referencia al documento con el ID personalizado
     const documentoRef = doc(coleccionSensores, sensorId);
     //Añadimos los datos al documento
     await setDoc(documentoRef,sensorData);

     alert("Sensor agregado con éxito.");

  } catch (e) {
    console.log(e)
  }
}

//Función para crear un ejecutor 
const agregarEjecutor = async  (nombreEjecutor,nombreEspacio) => {
  try {
    
    const coleccionEjecutores = collection(db, ejecutores);

    // Generar un ID personalizado que comience con "eje"
    const ejecutorId = "eje" + Math.random().toString(36).substr(2, 10);

    const ejecutorData = {
     nombre: nombreEjecutor,
     espacio: nombreEspacio,
     estado: 'Apagado'
    };

    // Crea una referencia al documento con el ID personalizado
    const documentoRef = doc(coleccionEjecutores, ejecutorId);
    // Añadimos los datos al documento
    await setDoc(documentoRef,ejecutorData);

    alert("Ejecutor agregado con éxito.");

 } catch (e) {
   console.log(e)
 }
}

//Función para modificar el nombre de un espacio
const modificarNombreEspacio = async (nombreNuevo,nombreViejo,id) => {
try {
  //función importada de Firebase
  await cambiarNombreEspacio(nombreNuevo,nombreViejo,id);
  alert("Nombre del espacio modificado con éxito.");
} catch (error) {
  console.error('Error al cambiar el nombre del espacio:', error);
}
}

//Función que se ejecuta al producirse el emit "eliminar" del componente sensor
const borrarSensor = async (sensorId) => {
  try {
    await deleteData(sensorId,'sensores');
    alert("Sensor eliminado con éxito.")
    ;
  } catch (error) {
    console.error('Error al eliminar el ejecutor:', error);
  }
}

//Función que se ejecuta al producirse el emit "eliminar" del componente ejecutor
const borrarEjecutor = async (ejecutorId) => {
  try {
    await deleteData(ejecutorId,'ejecutores');
    alert("Ejecutor eliminado con éxito.")
    ;
  } catch (error) {
    console.error('Error al eliminar el ejecutor:', error);
  }
}

//Función que elimina un espacio y los sensores y ejecutores cuyo atributo espacio coincide con el borrado
const eliminarEspacio = async (id) => {
  try {
    // Obtenemos el nombre del espacio borrado
    const espacioBorrado = arrayEspacios.value.find((el) => el.id === id);
    const nombreEspacioBorrado = espacioBorrado.nombre;

    // Borramos el espacio por su id en Firebase
    await deleteData(id, espacios);

    // Eliminar sensores asociados al espacio
    await eliminarSensoresEspacio(nombreEspacioBorrado);

    // Eliminar ejecutores asociados al espacio
    await eliminarEjecutoresEspacio(nombreEspacioBorrado);

    alert('Espacio eliminado con éxito.');
  } catch (error) {
    alert(`No ha sido posible eliminar el espacio. Error: ${error}`);
  }
};

//Función que permite cambiar el estado del ejecutor entre encendido y apagado
const encenderOApagarEjecutor = async (espacioId, boolean) => {
  try {
    await cambiaEstadoEjecutor(espacioId, boolean);
  } catch (error) {
    console.error('Error al cambiar el estado del ejecutor:', error);
  }
}

//Función que se ejecuta para abrir otra ventana en el navegador que nos lleva a la info de dicho dispositivo
function abrirURL(id) {
        // Abrir una nueva ventana. La URL tendrá como último parámetro el id de Firebase del dispositivo en el que se pulsa
        window.open('http://localhost:5174/' + id);
}
</script>


<template>
<div class="body">
 <div class="row">
  <div class="container text-center row gap-3 col-md-8">
    <br>
    <div v-for="el in arrayEspacios" :key="el.id">

      <div class="d-flex justify-content-between align-items-center">
        <h3><span class="tituloEspacio">{{ el.nombre }}</span></h3>
      </div>

    <h4>Sensores</h4>
    <visorSensores 
    v-for="sensor in arraySensores.filter(elemento=>elemento.espacio==el.nombre)" 
    :key="sensor.id"
    :nombre="sensor.nombre"
    :valor = "sensor.valor"
    @ver="abrirURL(sensor.id)"
    @eliminar = "borrarSensor(sensor.id)"
    ></visorSensores>
    <br>  
    <h4>Ejecutores</h4>
    <visorEjecutores v-for="ejecutor in arrayEjecutores.filter(elemento=>elemento.espacio==el.nombre)" 
    :key="ejecutor.id"
    :nombre="ejecutor.nombre"
    :estado="ejecutor.estado"
    @cambiar = "encenderOApagarEjecutor(ejecutor.id,$event)"
    @ver="abrirURL(ejecutor.id)"
    @eliminar = "borrarEjecutor(ejecutor.id)"
    ></visorEjecutores>
    <br>

    <h4>Opciones</h4>
    <visorEspacios 
    :key="el.id" 
    :nombre="el.nombre" 
    @cambiaSensor="manejarCambioSensor(el.nombre, el.id)" 
    @cambiaEjecutor="manejarCambioEjecutor(el.nombre, el.id)" 
    @cambiaNombre="manejarCambioNombre(el.nombre,el.id)"
    @eliminar="eliminarEspacio(el.id)"
    ></visorEspacios>
    <hr>
  </div>

  </div>

  <div class="col-md-4">
    <br>
    <formSensor 
    v-if="anadirSensor" 
    :nombre="nombreEspacio" 
    @cerrar="anadirSensor=false" 
    @agregar="agregarSensor($event,nombreEspacio)"
    ref="formSensorRef"
    ></formSensor>

    <formEjecutor 
    v-if="anadirEjecutor" 
    :nombre="nombreEspacio"
    @cerrar="anadirEjecutor=false" 
    @agregar="agregarEjecutor($event,nombreEspacio)"
    ref="formEjecutorRef"
    ></formEjecutor>

    <formEditarNombre
    v-if="cambiarNombre"
    :nombre="nombreEspacio"
    @cerrar="cambiarNombre=false"
    @cambiar="modificarNombreEspacio($event,nombreEspacio,espacioSeleccionado)" 
    ></formEditarNombre>
  </div>
 </div>
</div>
</template>