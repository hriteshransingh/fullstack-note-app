import {useEffect, useState } from 'react';
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home.jsx";
import {Toaster} from "react-hot-toast";
import {Loader} from "lucide-react";
import {axiosInstance} from "./lib/axios.js";




function App() { 

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(()=> {
    const authorized = async ()=> {
      try {
      const res = await axiosInstance.get("/auth/checkAuth", {
        withCredentials: true
      });
      console.log("User is authenticated:", res.data);
      setIsAuthenticated(true);
      }
      catch(error){
        console.log("User is not authenticated");
        setIsAuthenticated(false);
      }
  
    }
  
    authorized();
  
  
  }, []);

  if(isAuthenticated === null ){
    return <div className="flex justify-center items-center min-h-screen">
    <Loader className="h-8 w-8 text-purple-600 animate-spin" />
  </div>
  }

  return (
    <div  className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
    <Toaster position="top-center" reverseOrder={false} />
   <BrowserRouter>
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to = "/Login" />} />
      <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/login"element={<Login setIsAuthenticated={setIsAuthenticated} />} />
    </Routes>
   </BrowserRouter>
   </div>
    
   
  )
}

export default App
