import React,{memo,useState} from "react"
import CreativeSelect from "./CreativeSelect"
import Inputs from "./Inputs"
import './Predefine.css'
import Addnew from "./Addnew"
import SearchBox from "./SearchBox"
import axios from 'axios'
import {toast} from 'react-toastify'

function Predifne({data,onChan,handle,setData}){
    const [show,setShow]=useState(false)
    const [row,setRow]=useState([])
    let handleadd=(e)=>{
        setShow(true) 
    }
      let search=async()=>{
        if(data?.predefinedTech && data?.predefinedType){
    let rows=await axios.get(`http://localhost:5000/${data.predefinedTech}`).then(res=>res.data)
    setRow(rows)
        }else{
        toast.error('please select the field')
        }
      }
      let clear=()=>{
        setRow([])
      }
    let Tech = [
        { value: "react", label: "React" },
        { value: "java", label: "java" }
      ]
      let Type = [
        { value: "mcq", label: "mcq" },
        { value: "programming", label: "programming" }
      ]
      let searchboxdata=(item)=>{
        setData(prev=>({...prev,serachbox_data:item}))
      }
      let selectedRow=(arr)=>{
        setData(prev=>({...prev,totalRows : arr }))
        console.log(data)
      }
    return(
        <>
        <div className="row">
            <div className="col-sm-4">
                <Inputs 
                name="predefined"
                type="number"
                label="Predefined"
                handlechange={handle}
                />
            </div>
        </div>
        <div className="col-sm-4">
            <label>Technology</label>
            <CreativeSelect
            name="predefinedTech"
            onChanging={onChan}
            selectOption={Tech}
            /></div> 
        <div className="col-sm-4">
            <label>Question type</label>
            <CreativeSelect
            name="predefinedType"
            onChanging={onChan}
            selectOption={Type}/>
        </div>
        <div className="col-sm-4">
            <button className="btn btn-primary m-2" type="button" onClick={()=>{search()}}>Search</button>
            <button className="btn btn-primary m-2" type="button" onClick={()=>{clear()}}>Clear</button>
            <button className="btn btn-primary m-2 float-end" type="button" onClick={()=>handleadd()}>Addnew Question</button>
        </div>
        <div class="restpredefined">
        <div className="row">
            <div className="col-sm-12 search">
             <SearchBox row={row} 
             searchboxdata={searchboxdata}
             selectedRow={selectedRow}/>
            </div>
        </div>
        <div className="row">
         <div className="col-sm-6"> </div>
         <div className="col-sm-6 addnew bg-info">{show?<Addnew setShow={setShow} setRow={setRow} setData={setData} Data={data}/>:null}</div>
        </div>
        </div>
        </>
    )
}
export default memo(Predifne)