import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {getFirestore,collection,doc,getDocs,addDoc,deleteDoc,getDoc,updateDoc,onSnapshot,query,where} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";


const firebaseConfig = {
   //Aquí añadimos los datos de API que nos ha asignado FireBase
   apiKey: "AIzaSyDNhMVh3WVsfUrwf9DFLMYHAn3N_Fc5OCY",
   authDomain: "daw2cliente-34744.firebaseapp.com",
   projectId: "daw2cliente-34744",
   storageBucket: "daw2cliente-34744.appspot.com",
   messagingSenderId: "662995110759",
   appId: "1:662995110759:web:8ea5957be9a6d713f83dc2",
   measurementId: "G-VFRCQ3XBCS"

};

//Conectamos con la base de datos
const app = initializeApp(firebaseConfig);
export const db = getFirestore();


//Funciones CRUD
export const saveData = (ref,objeto) => addDoc(collection(db,ref),objeto)

export const getDataCollection = (ref) => getDocs(collection(db,ref))

export const deleteData = (id, ref) => deleteDoc(doc(db,ref,id))

export const getData = (id, ref) => getDoc(doc(db,ref,id))

export const updateData = (id, ref, objeto) => updateDoc(doc(db,ref,id),objeto)

// Función para escuchar constantemente los cambios en una colección de Firebase
export const listenToDataCollection = (ref, callback) => {

    // Obtenemos la referencia a la colección en Firebase
    const collectionRef = collection(db, ref);

    // Nos suscribimos a los cambios en la colección
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    const data = [];
    // Iterar sobre los documentos en el snapshot
    querySnapshot.forEach((doc) => {
    // Agregar los datos de cada documento al array data
    data.push({ id: doc.id, ...doc.data() });
    });
    // Llamar a la función de devolución de llamada en la que se devuelve el array con los datos actualizados
    callback(data);
   });
    // Devolver una función de limpieza para dejar de escuchar los cambios cuando sea necesario
    return unsubscribe;
};

// Función para actualizar el estado de un ejecutor
export const cambiaEstadoEjecutor = async (espacioId, encendido) => {
   try {
     // Obtenemos la referencia del documento en la colección 'ejecutores'
     const ejecutorRef = doc(db, 'ejecutores', espacioId);
 
     // Obtenemos los datos del documento
     const ejecutorSnapshot = await getDoc(ejecutorRef);
     const ejecutorData = ejecutorSnapshot.data();
     let estado = ejecutorData.estado;
 
     if (encendido) {
       // Actualizamos el estado del ejecutor
       estado = "Encendido";
     } else {
       estado = "Apagado";
     }
     
     // Actualizamos el documento con el ejecutor modificado
     await updateDoc(ejecutorRef, { estado: estado });
    
   } catch (error) {
     console.error('Error al cambiar el estado del ejecutor:', error);
   }
 };

 //Función para cambiar el nombre de un espacio y del atributo espacio de los sensores y ejecutores correspondientes
 export const cambiarNombreEspacio = async (nuevoNombre, nombreEspacio, idEspacio) => {
  try {
    // Actualizar el atributo 'nombre' del documento en la colección 'espacios'
    await updateData(idEspacio, 'espacios', { nombre: nuevoNombre });

    // Obtener todos los documentos de la colección 'sensores'
    const sensoresQuerySnapshot = await getDataCollection('sensores');
    sensoresQuerySnapshot.forEach(async (doc) => {
      const data = doc.data();
      if (data.espacio === nombreEspacio) {
        await updateData(doc.id, 'sensores', { espacio: nuevoNombre });
      }
    });

    // Obtener todos los documentos de la colección 'ejecutores'
    const ejecutoresQuerySnapshot = await getDataCollection('ejecutores');
    ejecutoresQuerySnapshot.forEach(async (doc) => {
      const data = doc.data();
      if (data.espacio === nombreEspacio) {
        await updateData(doc.id, 'ejecutores', { espacio: nuevoNombre });
      }
    });

  } catch (error) {
    console.error('Error al cambiar el nombre del espacio y actualizar los documentos relacionados:', error);
  }
}

//Función para eliminar los sensores correspondientes a un espacio cuando ese espacio se borra
export const eliminarSensoresEspacio = async (nombreEspacioBorrado) => {
  const sensoresQuery = query(collection(db, 'sensores'), where("espacio", "==", nombreEspacioBorrado));
  const sensoresSnapshot = await getDocs(sensoresQuery);

  sensoresSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
    console.log(`Sensor eliminado: ${doc.id}`);
  });
};

//Función para eliminar los ejecutores correspondientes a un espacio cuando ese espacio se borra
export const eliminarEjecutoresEspacio = async (nombreEspacioBorrado) => {
  const sensoresQuery = query(collection(db, 'ejecutores'), where("espacio", "==", nombreEspacioBorrado));
  const sensoresSnapshot = await getDocs(sensoresQuery);

  sensoresSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
    console.log(`Ejecutor eliminado: ${doc.id}`);
  });
};



