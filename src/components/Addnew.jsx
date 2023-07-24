import React,{useState,memo}from 'react'
import Inputs from './Inputs'
import CreativeSelect from './CreativeSelect'
import './Addnew.css'
import axios from 'axios'

function Addnew({setShow,setRow,setData,Data}){
    const [addopt,setAddopt]=useState([])
    const [addnew,setAddnew]=useState({options:{}})

    let create=async()=>{
        const data=
            {
                question_title:addnew.Questiontitle,
                Technology:addnew.predefinedTech,
                question_level:"expert",
                question_type:addnew.predefineType,
                question:addnew?.options,
            }
            if(Data.predefineType)
            {
                axios.post(`http://localhost:5000/${Data.predefinedTech}/?question_type=${Data.predefineType}`,
                data
                )
            }
            let rows=await axios.get(`http://localhost:5000/${Data.predefinedTech}`).then(res=>res.data)
            setRow(rows)
            setData(prev=>({ ...prev,[Data.createdpredefined_data]:addnew.options}))
    }
    // const [tech,setTech]=useState([])
    // const [Type,setType]=useState([])
    // useEffect(()=>{  
    //     dosomething()
    // },[])
    // let dosomething=async()=>{
    //     let res=await axios.get('http://localhost:5000/technology').then(res=>res.data)
    //      setTech(res)
    //     let typeres=await axios.get('http://localhost:5000/type').then(res=>res.data)
    //      setType(typeres)
    //     }
    let Tech=[
        {value:'react',label:'react'},
        {value:'php',label:'php'},
        {value:"java",label:"label"},
        {value:"python",label:"python"}
    ]
    let Type=[
        {value:'mcq',label:"mcq"},
        {value:'programming',label:"programming"},
        {value:'Descreptive',label:'Descreptive'}
    ]
    let onSelectChan = (name, { value }) => {
        setAddnew(prev => ({ ...prev, [name]: value }))
      }
      let onChangingQuestiontitle=(e)=>{
        setAddnew(prev=>({...prev,[e.target.name]:e.target.value}))
      }
      let onChangeopt = (e) => {
        setAddnew(prev => ({ ...prev, options:{...prev.options,[e.target.name]: e.target.value} }))
      }
    let add=()=>{
        if(addnew.predefineType==='mcq')
        {
            setAddopt([...addopt,0])
        }
    }
    let handledelete=(index)=>{
       let x=[...addopt]
       x.splice(index,1)
       setAddopt(x)
    }
    return (
        <>
        <label>Technology</label>
        <CreativeSelect
        name="predefinedTech"
        onChanging={onSelectChan}
        selectOption={Tech}
        />
        <label>Question type</label>
        <CreativeSelect
        name="predefineType"
        selectOption={Type}
        onChanging={onSelectChan}
        />
        <Inputs
        name="Questiontitle"
        type="text"
        label="Question title"
        handlechange={onChangingQuestiontitle}
        />
     <div className='symbol'>Answer Options<div className="addoption" onClick={add}>+</div> </div>
      {addopt.map((data,index)=>{
            return (
                <>
            <div className='row'>
                <div className='col-sm-8'>
                    <Inputs name={`option${index}`}
                    type="text"
                    handlechange={onChangeopt}
                    ></Inputs>
                </div>
                <div className='col-sm-4 '>
                    <div className='row'>
                    <div className='col-sm-6 check pt-3'>
                    <Inputs
                    type="checkbox"
                    label="is correct"
                    name={`answer${index}`}
                    handlechange={onChangeopt}
                    />
                    </div>
                    <div className="col-sm-6 d-flex mt-4">
                        <div className="delete " onClick={()=>handledelete(index)}>-</div>
                        </div>
                    </div>
                    </div>
            </div>
                </>
            )
        })}
        <div className='row'>
            <div className='col-sm-6'>
                <button className='btn btn-primary me-2' type="button"  onClick={()=>create()}>create</button>
                <button className='btn btn-primary' type="button">create & save now</button>
            </div>
            <div className='col-sm-6'>
                <button className='btn btn-danger ms-5 float-end' type="button" onClick={()=>{setShow(false)}}>Cancel</button>
            </div>
        </div>
        </>
    )
}
export default memo(Addnew)