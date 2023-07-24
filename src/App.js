import React, { useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import Form from "./components/Form";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { toast } from "react-toastify"

function App() {
  let [isForm,setisForm]=useState(false)
  let onhanleNewForm=()=>{
    setisForm(true)
    isForm=isForm
  }
  return (
    <>
    <Form onhanleNewForm={onhanleNewForm}></Form>
    {isForm ? <Form onhanleNewForm={onhanleNewForm}></Form>:null}
    </>
  )
}
export default App;
