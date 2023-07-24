import React, { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import Inputs from './Inputs';
import Radio from "./Radio"
import CreativeSelect from './CreativeSelect';
import RandomQuestion from "./RandomQuestion";
import Predefine from "./Predefine";
import { toast } from "react-toastify"
import axios from 'axios';
function Form ({onhanleNewForm}){
    const [tabValue, setTabValue] = useState('left')
    const [disable,setdisabled]=useState(false)
    const [data,setData] = useState(
      {
        testName: '',
        testtype: '',
        managed: '',
        screening: '',
        totalQuestion: 0,
        Random: '',
        RandomMcq: '',
        RandomSelect:'',
        RandomProgramming: '',
        RandomDescrpetive: '',
        predefined: 0,
        predefined_data:'',
        createdpredefined_data:'',
        serachbox_data:'',
        totalRows:[],
      }
    )
    useEffect(()=>{
        if(data.predefined && Number(data?.predefined)===(data?.totalRows).length)
        {
            setdisabled(true)   
        }
    },[data.totalRows])
    
    console.log(data?.predefined)
    console.log((data.totalRows).length)
    console.log(disable)
    let onSelectChange = (name, { value }) => {
      setData(prev => ({ ...prev, [name]: value }))
    }
    let onChanging = (e) => {
      setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    let total = 0
    total =Number(data.Random) + Number(data.predefined)
    let selectOptions = [
      { value: "xyz", label: "xyz" },
      { value: "abc", label: "abc" }
    ]
    let manage = [
      { value: 'candidate', label: 'candidate' },
      { value: 'Agent', label: 'Agent' }
    ]
    let screening = [
      { value: 'postInterview', label: "postInterview" },
      { value: 'preInterview', label: "preInterview" }
    ]
    let functionss = () => {
      if (data.managed === 'Agent') return true
      else return false
    }
    let handleSubmit=()=>{
      const submitdata={
        hiring_request_id	:'',
        level	:	4,
        hiring_technologies:[2],
        test_types:[{
          test_type_key	:data.testtype,
         test_name	:	data.testtype,
        is_screening_test	:data.screening,
        is_for_agent_panel	:	false,
         is_mcq	:	true,
         no_of_predefined_questions	:data.predefined,
         total_no_question	:data.totalQuestion,
        }],
        predefined_questions:{
                             no_of_predefined_questions	:data.predefined,
                                already_selected_question:	[data.serachbox_data],
                                newly_created_questions	:	[data.createdpredefined_data] },
        random_question:{
          no_of_random_question:data.Random,
          technologies:[
            { tehnologies_key:data.RandomSelect,
          question_type_details:{mcq:data.RandomMcq}}
          ]
        }
    }
    axios.post('http://localhost:5000/Form',submitdata)
  }
    return (
      <>
        {Number(data.predefined) && (data.totalQuestion ? Number(data.totalQuestion) : 0) <= total ? toast.error('Enter limited number') : null}
        <div className='container mx-auto py-4'>
          <form>
            <div className='row'>
              <div className='col-sm-6 fs-5 content'>
                <div>
                  <Inputs type="text"
                    label="Test Name"
                    name="testName"
                    handlechange={onChanging} />
  
                  <button className="plus_btn btn btn-outline-success rounded-circle" type="button"
                  onClick={()=>onhanleNewForm()} >+</button>
                </div>
                <label>Select Test type and Create</label>
                <CreativeSelect
                  selectOption={selectOptions}
                  name="testtype"
                  onChanging={onSelectChange} />
                <label>Managed By</label>
                <CreativeSelect
                  selectOption={manage}
                  name="managed"
                  onChanging={onSelectChange} />
                <div className="Radio">is mcq<br />
                  <Radio type="radio" label="yes" disabled={functionss()} handlechange={onChanging} name="Ismcq" />
                  <Radio type="radio" disabled={functionss()} label="NO" handlechange={onChanging} name="Ismcq" />
                </div>
                <label>Screening Type</label>
                <CreativeSelect selectOption={screening} name="screening" onChanging={onSelectChange} />
                <Inputs type="number" label="Total No of Question" name="totalQuestion" handlechange={onChanging} />
                {data.totalQuestion ? null : <><button className="btn btn-primary me-5 btn1">Sumbit CandiDate form</button>
                  <button className="btn btn-danger  ms-1  btn2">Cancel</button> </>}
              </div><div className='col-sm-6 '></div>
            </div>
            {data.totalQuestion ? <>  <div className="row">
              <div className={`col-sm-6 heading ${tabValue === 'left' ? 'somthing' : ''}`} onClick={() => setTabValue("left")} >Random Question </div>
              <div className={`col-sm-6 heading ${tabValue ==='right' ? 'somthing' : ''}`} onClick={() => setTabValue("right")}>Predefine Question
              </div></div>
              <div className="row">
                {
                  tabValue === 'left' ? <><div className="col-sm-6"><RandomQuestion data={data} onChan={onSelectChange}
                    handle={onChanging} /></div><div className="row">
                      <div className="col-sm-6">
                        <button className="btn btn-primary float-start">Sumbit CandiDate form</button>
                        <button className="btn btn-danger  float-end">Cancel</button>
                        <div className="col-sm-6"></div>
                      </div>
                    </div></>
                    : <><Predefine data={data} onChan={onSelectChange} handle={onChanging} setData={setData}/>
                <div className="col-sm-12">
                        <button className="btn btn-primary w-50 float-start" type="button" onClick={() => { handleSubmit() }} >Sumbit CandiDate form</button>
                        <button className="btn btn-danger  float-end">Cancel</button>
                      </div> </>
                }
              </div>
            </> : null}
          </form>
        </div>
      </>
    );
  }
export default Form 