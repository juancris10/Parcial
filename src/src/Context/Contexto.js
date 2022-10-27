import React ,{ createContext, useContext,useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc, addDoc, updateDoc} from 'firebase/firestore'
import { db } from '../Services/firebase.js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'


const ProductosContexto = createContext();

export default function ContextoProvider({children}){

    const MySwal = withReactContent(Swal)
    const {id} = useParams()
    const [productos, setProductos] = useState([])
    const[codigo, setCodigo] = useState('')
    const[descripcion, setDescripcion] = useState('')
    const[existencia, setExistencia] = useState(0)
    const[entradas, setEntradas] = useState(0)
    const[salidas, setSalidas] = useState(0)
    const[stock, setStock] = useState(0)
    const[fecha, setFecha]= useState()
    const[cantidad, setCantidad] =useState(0)
    const[factura, setFactura] =useState("")
    const[registroSal, setRegistroSal]= useState([])
    const[registroEntra, setRegistroEntra]= useState([])

    

    //referencia al db firestore
    const productosCollection = collection(db, "productos")
    const salidasCollection = collection(db, "salidas")
    const entradasCollection = collection(db, "entradas")
    //ver todos los DOCS
    const getProductos = async () => {
        const data = await getDocs(productosCollection)

        setProductos(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
    }

    //eliminar
    const deleteProducto = async (id) => {
        const ProductoDoc = doc(db, "productos", id)
        await deleteDoc(ProductoDoc)
        getProductos()
    }
    const deleteEntradas = async (id) => {
        const ProductoDoc = doc(db, "entradas", id)
        await deleteDoc(ProductoDoc)
        getProductos()
    }
    const deleteSalidas = async (id) => {
        const ProductoDoc = doc(db, "salidas", id)
        await deleteDoc(ProductoDoc)
        getProductos()
    }
    const confirDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProducto(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    const confirDeleteEntrada = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProducto(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    //useEfecct
    useEffect( () => {
        getProductos()
        getSalidas()
        getEntrada()
    }, [] )

    const datosProductos = async (e) => {
        e.preventDefault()
        await addDoc(productosCollection,  {descripcionProd:descripcion, 
            existenciaProd:existencia, entradasProd:entradas, salidasProd:salidas, stockProd:stock, codigoProd: codigo})
    }

    const cargarEntySal= (id, entradas, salidas, existencia)=>{
        let total= (existencia+entradas-salidas)
        setStock(total)
        
    }



    const getSalidas = async (e) => {
        const data = await getDocs(salidasCollection)

        setRegistroSal(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
    }

    
    const getEntrada = async (e) => {
        const data = await getDocs(entradasCollection)

        setRegistroEntra(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        )
    }

    const guardarEntradas = async(entradas, fecha, codigo, descripcion) =>{
        await addDoc(entradasCollection,{
            entrada:entradas, fecha:fecha, codigo:codigo, descripcion:descripcion
        })
        
    }
    const guardarSalidas = async(salidas, fecha, codigo, descripcion) =>{
        await addDoc(salidasCollection,{
            salida:salidas, fecha:fecha, codigo:codigo, descripcion:descripcion
        })
    }
    ///

    return(
        <ProductosContexto.Provider value={{MySwal, id, productos, 
        setProductos, descripcion, setDescripcion, existencia, setExistencia, entradas, setEntradas,salidas, setSalidas,stock, setStock, 
        confirDelete, useEffect, datosProductos,fecha,registroEntra, codigo,deleteSalidas, deleteEntradas,setCodigo,cargarEntySal,registroSal,guardarEntradas, guardarSalidas}}>
        {children}
        </ProductosContexto.Provider>
    )

}
export function useProductos() {
    const context = useContext(ProductosContexto);
    if (!context) throw new Error("El context esta Vacio");
    return context;
}