import React from "react";
import {Routes,Route,useNavigate} from 'react-router-dom';
import Login from "./components/Login";
import Home from "./container/Home";
const App = ()=>{
    return(
       <Routes>
           <Route path='login' element={<Login/>}></Route>
           <Route path='/*' element={<Home/>}></Route>
       </Routes>
    )
}
export default App;