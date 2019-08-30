import React, { Dispatch } from "react";

import styles from "./NameForm.module.scss"

export const NameForm: React.FC<{name: string, setName: Dispatch<string>}> = ({name, setName}) => {
    return(
        <div>
            <label className={styles.label}>Name: </label>
            <input className={styles.input} value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        </div>
    )
}