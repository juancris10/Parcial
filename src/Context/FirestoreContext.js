import fsContexto from "./Contexto";
import { addDoc,collection,query,onSnapshot, updateDoc,doc,deleteDoc, getDoc}  from "firebase/firestore";
import { fs } from "../Services/Firebase";
import { useState, useEffect } from "react";

export default function FirestoreContext(props){

    const { children } = props;
    const [ inventario, setInventario] = useState([]);
    const [ entradas, setEntradas] = useState([]);
    const [ salidas, setSalidas] = useState([]);

    const registrarProducto = async (codigo,descripcion,exisInicial) => {
        await addDoc(collection(fs,"Productos"),{
            Codigo: codigo,
            Descripcion: descripcion,
            ExistenciaInicial: exisInicial,
            Entradas: 0,
            Salidas: 0,
            Stock: 0
        })
    }

    const modoficarProducto = async (identificador, codigo,descripcion,exisInicial) => {
        const intexisInicial = parseInt(exisInicial)
        await updateDoc(doc(fs,"Productos",identificador),{
            Codigo: codigo,
            Descripcion: descripcion,
            ExistenciaInicial: intexisInicial,
        })
    }

    const eliminarProducto = (identificador) => {
        deleteDoc(doc(fs,"Productos",identificador))
    }


    const entradaProducto = async (identificador,codigo,fecha,descripcion,cantEntrada,entradasInv,productosIniciales,salidasInv) =>{
        await addDoc(collection(fs,"Entradas"),{
            Codigo: codigo,
            Fecha: fecha,
            Descripcion: descripcion,
            Entradas: cantEntrada
        })
        
        const referenciaInv = await getDoc(doc(fs,"Productos",identificador));
        var TotalEntrada = 0;
        var TotalStock = 0;
        if (referenciaInv.exists()){
            const intEntrada = parseInt(cantEntrada);
            const intSalida = parseInt(salidasInv);
            const intEntradaInventario = parseInt(entradasInv);
            const productoIncial = parseInt(productosIniciales);
            TotalEntrada = intEntrada + intEntradaInventario;
            TotalStock = TotalEntrada + productoIncial - intSalida;
            await updateDoc(doc(fs,"Productos",identificador),{
                Entradas: TotalEntrada
            })
            await updateDoc(doc(fs,"Productos",identificador),{
                Stock: TotalStock
            })
        }
    }

    const salidaProducto = async (identificador,codigo,fecha,descripcion,cantSalida,salidasInv,productosIniciales,entradasInv) =>{
        await addDoc(collection(fs,"Salidas"),{
            Codigo: codigo,
            Fecha: fecha,
            Descripcion: descripcion,
            Salidas: cantSalida
        })

        const referenciaInv = await getDoc(doc(fs,"Productos",identificador));
        var TotalSalida = 0;
        var TotalStock = 0;
        if (referenciaInv.exists()){
            const intEntrada = parseInt(entradasInv)
            const intSalida = parseInt(cantSalida);
            const intSalidaInventario = parseInt(salidasInv);
            const productoIncial = parseInt(productosIniciales);
            TotalSalida = intSalida + intSalidaInventario;
            TotalStock =  productoIncial - TotalSalida + intEntrada ;
            console.log(TotalStock)
            await updateDoc(doc(fs,"Productos",identificador),{
                Salidas: TotalSalida
            })
            await updateDoc(doc(fs,"Productos",identificador),{
                Stock: TotalStock
            })
        }



        
    }

    useEffect(() => {
        const q = query(collection(fs,"Productos"))
        const mostrarDatos = onSnapshot(q, (querysnapshot) => {
            const docs = [];
            querysnapshot.forEach((produc) => {
                docs.push({...produc.data(), id: produc.id});
            });
            setInventario(docs);
        })
        return mostrarDatos;
    },[]);

    useEffect(() => {
        const q = query(collection(fs,"Entradas"))
        const mostDatos = onSnapshot(q, (querysnapshot) => {
            const document = [];
            querysnapshot.forEach((produc) => {
                document.push({...produc.data(), id: produc.id});
            });
            setEntradas(document);
        })
        return mostDatos;
    },[]);

    useEffect(() => {
        const q = query(collection(fs,"Salidas"))
        const mostDatos = onSnapshot(q, (querysnapshot) => {
            const document = [];
            querysnapshot.forEach((produc) => {
                document.push({...produc.data(), id: produc.id});
            });
            setSalidas(document);
        })
        return mostDatos;
    },[]);


    return(
        <>
            <fsContexto.Provider value={{
                registrarProducto,
                modoficarProducto,
                eliminarProducto,
                entradaProducto,
                salidaProducto,
                salidas,
                entradas,
                inventario
            }}>
                {children}
            </fsContexto.Provider>
            


        
        </>
    )

}
