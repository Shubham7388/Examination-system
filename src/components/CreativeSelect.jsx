import React, { useState } from "react"
import { memo } from "react"
import CreatableSelect from 'react-select/creatable'


function CreativeSelect({selectOption,name,onChanging}) {
    const [option, setOption] = useState(selectOption)
    let handlecreate = (inputValue) => {
        setOption(prev => ([...prev, { 'value': inputValue, 'label': inputValue }]))
    }
    return (
        <>
            <CreatableSelect
                options={option}
                onChange={(obj)=>onChanging(name,obj)}
                defaultValue="Please Select"
                onCreateOption={handlecreate}
                className="mb-1"
            />
        </>
    )
}
export default memo(CreativeSelect)
