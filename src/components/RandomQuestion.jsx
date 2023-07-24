import React from "react"
import CreativeSelect from "./CreativeSelect"
import Inputs from "./Inputs"
import { toast } from "react-toastify"


function RandomQuestion({data,onChan,handle}){
    let selectOption=[
        {value:"react",label:"react"}
    ]
        let total=0
        total= (data.RandomMcq?Number(data.RandomMcq):0)+(data.RandomProgramming?Number(data.RandomProgramming):0)+
        (data.RandomDescrptive?Number(data.RandomDescrptive):0)
    return (
        <>
        {data.Random && (Number(data.totalQuestion) < Number(data.Random)?toast.error('please enter less than total')
        :null)}
    {(Number(data.Random)<total)?toast.error('please enter valid value'):null}
       <Inputs
       type="number"
       label="Random Question"
       name="Random"
       handlechange={handle}/> 
       <CreativeSelect 
       name="RandomSelect" 
       selectOption={selectOption}
      onChanging={onChan}/>
       <Inputs type="number"
       label="no of mcq"
       name="RandomMcq"
      handlechange={handle}
       />
      {data.managed!=='Agent' &&data.Ismcq!=='yes'? <><Inputs type="number"
       label="no of Programming"
      handlechange={handle}
       name="RandomProgramming"/>
        <Inputs type="number"
       label="no of Descreptive"
       name="RandomDescrptive"
       handlechange={handle}/></>:null}
        </>
    )
}


export default RandomQuestion