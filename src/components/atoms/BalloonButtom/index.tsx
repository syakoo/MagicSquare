import React, { ReactElement } from "react";

import styles from "./BalloonButton.module.scss"

interface IBalloonButton {
    label: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    isEmpha?: boolean;
    LorR?: "left" | "right";
}  

export const BalloonButton: React.FC<IBalloonButton> = ({
    label, onClick, isEmpha=false ,LorR="left"
}) => {
    
    return(
        <div className={(isEmpha? styles.empha: styles.normal) + " " + ((LorR==="left")? styles.left: styles.right)}>
            <button onClick={onClick}>{label}</button>
            {/*<svg xmlns="http://www.w3.org/2000/svg">
                <g onClick={onClick} >
                    <circle />
                    <ellipse />
                    <text fill="#DBEDF0">{label}</text>
                </g>
            </svg>*/}
        </div>
    )
};