import React,{memo} from "react"
function Radio({label,name,handlechange,disabled}){
    return (
        <>
        <input type="radio" value={label} name={name} onChange={handlechange} disabled={disabled}
        className="me-3 ms-2"/>
        <label disabled={disabled}>{label}</label>
        </>
    )
}
export default memo(Radio)