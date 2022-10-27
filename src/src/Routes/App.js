import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Container/Home";
import Entradas from "../Components/Entradas";

import FirestoreContext from "../Context/FirestoreContext";
import Salidas from "../Components/Salidas";

export default function App(){
  
  return(
    <>
      <BrowserRouter>
        <FirestoreContext>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="*" element={<Home />}></Route>
                <Route exact path="/Entradas" element={<Entradas />}></Route>
                <Route exact path="/Salidas" element={<Salidas />}></Route>
            </Routes>
        </FirestoreContext>
      </BrowserRouter>
    </>
  )

}
