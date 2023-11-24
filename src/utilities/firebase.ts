
import { getFirestore, doc, setDoc, getDoc, collection, query, getDocs, onSnapshot, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { crearProductos } from './crearTarjetas';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjsyNQ6Hs-WXhJRndiaB1IkLhtAAYuXgc",
  authDomain: "check-final-3.firebaseapp.com",
  projectId: "check-final-3",
  storageBucket: "gs://check-final-3.appspot.com",
  messagingSenderId: "825792692926",
  appId: "1:825792692926:web:3e2925091212e3f85f14ef",
  measurementId: "G-SZXELY2W2W"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage();

// Initialize Firebase
const analytics = getAnalytics(app);
//Esta es la funcion que me sube el producto, primero sube la imagen del producto para que asi me de la url y luego si sube los datos
export const subirProducto = async (nombre: string, descripcion: string, precio: string, cantidad: string, imagen: File) => {
  console.log(imagen)
  const imageURL: string | void = await subirArchivo(imagen)
  await subirDatos(nombre, descripcion, precio, cantidad, imageURL)
}

export const traerProductos = async () => {
  const q = await query(collection(db, "recetas"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q)
  const listaProductos: any[] = []
  querySnapshot.forEach((doc) => {
    listaProductos.push(doc.data())
  });
  return listaProductos
}

export const tiempoRealProductos = async (contenedor: HTMLElement) => {
  const q = await query(collection(db, "recetas"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    crearProductos(contenedor)
  });
}

//Sube la imagen, importante ponerle await al uploadBytes ya que si no no me espera que se suba la imagen para hacer la request de la URL
export const subirArchivo = async (file: File) => {
  const storageRef = await ref(storage, `imagesProductos/${file.name}`);
  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
  return await pedirURL(`imagesProductos/${file.name}`)
}

//Me trae la URL de la imagen subida segun el nombre que le di, solo funciona si la imagen ya esta subida
export const pedirURL = async (path: string) => {
  const url = await getDownloadURL(ref(storage, `${path}`))
  console.log(url)
  return url
}

//Me sube los datos de cada producto, ya despues de que la imagen se haya subido
const subirDatos = async (nombre: string, descripcion: string, precio: string, cantidad: string, imagen: string | void) => {
  await setDoc(doc(db, "productos", nombre), {
    name: nombre,
    descripcion: descripcion,
    precio: precio,
    cantidad: cantidad,
    imagen: imagen,
    date: new Date()
  });
  console.log("Se subio el producto")
}