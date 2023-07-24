import React from "react"
import {memo} from "react"
import './Input.css'

let  Inputs=({type,label,name,handlechange})=>{
    return (<>
  {type==='checkbox'?<><label>{label}</label><input type={type} name={name}  onChange={handlechange}/></>
:<><label>{label}</label><br/>
    <input type={type} name={name} className="form-control mb-3" onChange={handlechange}/></>}
</>)}
export default memo(Inputs)