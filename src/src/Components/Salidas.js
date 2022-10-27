import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
import { useProductos } from '../Context/Contexto'
const MySwal = withReactContent(Swal)

const Salidas = () => {
    const {registroSal, deleteSalidas, productos} = useProductos();
    
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className="d-grid gap-2">
                            <Link to="/" className='btn btn-secondary mt-2 mb-2'>Volver</Link>

                        </div>
                        <table className='table table-warning table-hover'>
                            <thead>
                                <tr>
                                    <th>N° Factura</th>
                                    <th>Fecha</th>
                                    <th>Código Producto</th>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Opcion</th>
               
                                </tr>
                            </thead>

                            <tbody>
                                {registroSal.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.fecha}</td>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>{producto.salida}</td>
                                       
                                        <td>
                                            <button onClick={() => {deleteSalidas(producto.id)}} className="btn btn-danger"><i className="fa-regular fa-trash-can"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Salidas