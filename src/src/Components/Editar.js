import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLibro, useProductos } from '../Context/Contexto'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Services/firebase.js'

const Editar = () => {
    const { existencia,
        entradas, setEntradas, salidas,setSalidas,stock, cargarEntySal, guardarEntradas, codigo, guardarSalidas,descripcion, setCodigo, setDescripcion, setExistencia, setStock} = useProductos();
    const { id } = useParams()
    const navigate= useNavigate()
    cargarEntySal(id, entradas, salidas, existencia)
    
    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "productos", id)
        var today = new Date();
        var fecha = today.toLocaleString();
        const data = { entradasProd: entradas, salidasProd: salidas, stockProd:stock, fecha:fecha}
        await updateDoc(product, data)
        await guardarEntradas(entradas, fecha, codigo, descripcion)
        await guardarSalidas(salidas, fecha, codigo, descripcion)
        navigate('/')
    }


    const getProducbyId = async (id) => {
        const product = await getDoc(doc(db, "productos", id))
        if (product.exists()) {
            setEntradas(product.data().entradasProd)
            setCodigo(product.data().codigoProd)
            setSalidas(product.data().salidasProd)
            setDescripcion(product.data().descripcionProd)
        } else {
            console.log("NO")
        }

    }
    useEffect(() => {
        getProducbyId(id)
    }, [])


    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Cargar Salidas y Entradas</h1>

                    <form onSubmit={update}>
                        <div className='mb-3'>
                            <label className='form-label'>Entrada</label>
                            <input
                                value={entradas}
                                onChange={(e) => setEntradas(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Salida</label>
                            <input
                                value={salidas}
                                onChange={(e) => setSalidas(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                        <label className='form-label'>Codigo Producto</label>
                        <input
                            value={codigo}
                            onChange={ (e) => setCodigo(e.target.value)}
                            type='text'
                            disabled="disabled"
                            className= 'form-control'
                        />
                     </div>

                        <div className='mb-3'>
                            <label className='form-label'>Descripcion</label>
                            <input
                                value={descripcion}
                                onChange={ (e) => setDescripcion(e.target.value)}
                                type='text'
                                disabled="disabled"
                                className= 'form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Existencias Iniciales</label>
                            <input
                                value={existencia}
                                onChange={ (e) => setExistencia(e.target.value)}
                                type='text'
                                disabled="disabled"
                                className= 'form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Stock</label>
                            <input
                                value={stock}
                                onChange={ (e) => setStock(e.target.value)}
                                type='text'
                                disabled="disabled"
                                className= 'form-control'
                            />
                        </div>
                        



                        <button type='submit' className='btn btn-primary'>Update</button>


                    </form>
                </div>
            </div>

        </div>
    )
}

export default Editar
