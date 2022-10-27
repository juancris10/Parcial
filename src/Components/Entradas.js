import { useState, useContext,useEffect} from "react";
import Contexto from "../Context/Contexto";


export default function Entradas(){

    const [ codigo, setCodigo] = useState();
    const [ cantEntrada, setCantEntrada ] = useState(0);
    const { entradaProducto,inventario,entradas} = useContext(Contexto);
    const [ descripcion,setDescripcion] = useState("");
    const [ identificador, setIdentificador] = useState("");
    const [ entradasInv,setEntradasInv] = useState("");
    const [ salidasInv,setSalidasInv] = useState("");
    const [ productosIniciales,setProductosIniciales] = useState("");
    
    const registrarEntrada = async (e) =>{
        e.preventDefault();
        var today = new Date();
        var fecha = today.toLocaleString();
        var existeCod = "false";
        inventario.forEach(element => {
            if(codigo == element.Codigo){
                existeCod = "true";
                setDescripcion(element.Descripcion);
                setIdentificador(element.id)
                setSalidasInv(element.Salidas)
                setEntradasInv(element.Entradas)
                setProductosIniciales(element.ExistenciaInicial);
            }
        });
        if (existeCod == "true"){
            if (identificador){
                await entradaProducto(identificador,codigo,fecha,descripcion,cantEntrada,entradasInv,productosIniciales,salidasInv);
            }            
        }
    }



    return(
        <>
        
            <div className="container-xl">
                    <div className="table-responsive ">
                        <div className="table-wrapper">
                            <div className="table-title bg-success ">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h2>Entradas Productos</h2>
                                    </div>
                                    <div className="col-sm-6">
                                        <a href="/" className="btn btn-sm btn-warning"><i className="material-icons">&#xE147;</i> <span>Volver</span></a>	
                                        <a href="#addEmployeeModal" className="btn btn-sm btn-warning" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Añadir Entrada</span></a>
                                        				
                            
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>

                                        </th>
                                        <th>N° Factura</th>
                                        <th>Fecha</th>
                                        <th>Codigo Producto</th>
                                        <th>Descripcion</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entradas.map((lstEntradas,index) => (
                                    <tr key={lstEntradas.id}>
                                        <td>

                                        </td>
                                        <td>{index}</td>
                                        <td>{lstEntradas.Fecha}</td>
                                        <td>{lstEntradas.Codigo}</td>
                                        <td>{lstEntradas.Descripcion}</td>
                                        <td>{lstEntradas.Entradas}</td>
                                        <td>
                                          
                                        </td>
                                    </tr>
                                    ))} 
                                </tbody>
                            </table>
                        </div>
                    </div>        
                </div>
                {/* <!-- Añadir nuevo Entrada --> */}
                <div id="addEmployeeModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div>
                                <div className="modal-header">						
                                    <h4 className="modal-title">Añadir Entrada</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">					
                                    <div className="form-group">
                                        <label>Codigo</label>
                                        <input type="text" className="form-control" required onChange={(e) => setCodigo(e.target.value) } />
                                    </div>
                                    <div className="form-group">
                                        <label>Entrada</label>
                                        <input className="form-control" type="number"  required onChange={(e) => setCantEntrada(e.target.value)}/>
                                    </div>
                                    
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                    <input type="submit" className="btn btn-success" data-dismiss="modal" value="Añadir" onClick={registrarEntrada}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}