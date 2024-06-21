import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import {getFirestore,collection,getDocs,onSnapshot,addDoc,deleteDoc,doc,getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";


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
export const db = getFirestore()


//CRUD

export const saveData = (ref,objeto) => addDoc(collection(db,ref),objeto)

export const getDataCollection = (ref) => getDocs(collection(db,ref))

export const getDataChanged_collection = ( ref, callBack) => onSnapshot(collection(db,ref),callBack)

export const getDataChanged_document = (ref, document, callBack) => onSnapshot(doc(db,ref, document),callBack)

export const deleteData = (id, ref) => deleteDoc(doc(db,ref,id))

export const getData = (id, ref) => getDoc(doc(db,ref,id))

export const updateData = (id, ref, objeto) => updateDoc(doc(db,ref,id),objeto)






