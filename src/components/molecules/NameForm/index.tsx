import React, { Dispatch } from "react";

import styles from "./NameForm.module.scss";

export const NameForm: React.FC<{
  name: string;
  setName: Dispatch<string>;
}> = ({ name, setName }) => {
  return (
    <>
      <input
        className={styles.input}
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
        spellCheck={false}
      ></input>
    </>
  );
};
