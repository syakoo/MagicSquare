import React, { Dispatch } from "react";

export const NameForm: React.FC<{name: string, setName: Dispatch<string>}> = ({name, setName}) => {
    return(
        <div>
            <label>Name: </label>
            <input value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        </div>
    )
}