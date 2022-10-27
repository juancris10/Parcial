import "../Assets/css/Home.css";
import { useState, useContext } from "react";
import Contexto from "../Context/Contexto";




export default function Home(){


    const [ codigo, setCodigo] = useState("");
    const [ descripcion,setDescripcion] = useState("");
    const [ exisInicial, setExisInicial] = useState("");
    const [ identificador, setIdentificador ] = useState("");
    const { registrarProducto,inventario,modoficarProducto,eliminarProducto,entradas} = useContext(Contexto);

    function iden(id){
        const ide = id;
        setIdentificador(ide)
    }

    const registroProd = async (e) => {
        e.preventDefault();
        await registrarProducto(codigo,descripcion,exisInicial)
    }

    const modProducto = async (e) => {
        e.preventDefault();
        await modoficarProducto(identificador,codigo,descripcion,exisInicial)
    }

    const eleminiarProd = async (e) => {
        e.preventDefault();
        await eliminarProducto(identificador);
    }

    inventario.forEach(element => {
        const existInicial = parseInt(element.ExistenciaInicial);
        var totalStock = exisInicial + element.Entradas;

        console.log(totalStock)
    });
    
    
    


    return(
        <>
            <div className="container-xl">
                <div className="table-responsive">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Productos Inventarios</h2>
                                </div>
                                <div className="col-xs-6">
                                    <a href="#addEmployeeModal" className="btn btn-sm btn-info" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Añadir Nuevo Producto</span></a>						
                                    <a href="/Entradas" className="btn btn-sm btn-success" ><i className="material-icons">&#xE147;</i> <span>Registrar Entrada de Producto</span></a>
                                    <a href="/Salidas" className="btn btn-sm btn-danger" ><i className="material-icons">&#xE147;</i> <span>Registrar Salida de Producto</span></a>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id="selectAll"/>
                                            <label htmlFor="selectAll"></label>
                                        </span>
                                    </th>
                                    <th>Codigo Producto</th>
                                    <th>Descripcion</th>
                                    <th>Existencias Iniciales</th>
                                    <th>Entradas</th>
                                    <th>Salidas</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventario.map((invProducto) => (
                                <tr key={invProducto.id}>
                                    <td>
                                        <span className="custom-checkbox">
                                            <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                                            <label htmlFor="checkbox1"></label>
                                        </span>
                                    </td>
                                    <td>{invProducto.Codigo}</td>
                                    <td>{invProducto.Descripcion}</td>
                                    <td>{invProducto.ExistenciaInicial}</td>
                                    <td>{invProducto.Entradas}</td>
                                    <td>{invProducto.Salidas}</td>
                                    <td>{invProducto.Stock}</td>
                                    <td>
                                        <a href="#editEmployeeModal" className="edit" onClick={() => iden(invProducto.id)} data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                        <a href="#deleteEmployeeModal" className="delete" onClick={() => iden(invProducto.id)} data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                    </td>
                                </tr> 
                                ))}    
                            </tbody>
                        </table>
                    </div>
                </div>        
            </div>
            {/* <!-- Añadir nuevo Producto --> */}
            <div id="addEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div>
                            <div className="modal-header">						
                                <h4 className="modal-title">Añadir Producto</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">					
                                <div className="form-group">
                                    <label>Codigo</label>
                                    <input type="text" className="form-control" required onChange={(e) => setCodigo(e.target.value) } />
                                </div>
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <textarea type="text" className="form-control" required onChange={(e) => setDescripcion(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Existencia Inicial</label>
                                    <input className="form-control" required onChange={(e) => setExisInicial(e.target.value)}/>
                                </div>
                                
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                <input type="submit" className="btn btn-success" data-dismiss="modal" value="Añadir" onClick={registroProd}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Editar Producto */}
            <div id="editEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div>
                            <div className="modal-header">						
                                <h4 className="modal-title">Editar Producto</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">					
                                <div className="form-group">
                                    <label>Codigo Producto</label>
                                    <input type="text" className="form-control" required onChange={(e) => setCodigo(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <textarea type="text" className="form-control" required onChange={(e) => setDescripcion(e.target.value)}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Existencia Inicial</label>
                                    <input className="form-control" required onChange={(e) => setExisInicial(e.target.value)}/>
                                </div>		
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                <input type="submit" className="btn btn-info" data-dismiss="modal" value="Guardar" onClick={modProducto}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="deleteEmployeeModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div>
                            <div className="modal-header">						
                                <h4 className="modal-title">Eliminar Libro</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div className="modal-body">					
                                <p>¿Estas Seguro que deseas Eliminar el Libro?</p>
                                <p className="text-warning"><small>Esta accion no se puede deshacer.</small></p>
                            </div>
                            <div className="modal-footer">
                                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                <input type="submit" className="btn btn-danger" data-dismiss="modal" value="Eliminar" onClick={eleminiarProd}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )




}