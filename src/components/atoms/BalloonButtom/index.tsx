import React from "react";

import styles from "./BalloonButton.module.scss"

interface IBalloonButton {
    label: string;
    onClick: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
    isEmpha?: boolean;
    LorR?: "left" | "right";
}  

export const BalloonButton: React.FC<IBalloonButton> = ({
    label, onClick, isEmpha=false ,LorR="left"
}) => {
    
    return(
        <div className={(isEmpha? styles.empha: styles.normal)} style={(LorR=="left")? {left: "0px"}: {right: "0px"}}>
            <svg xmlns="http://www.w3.org/2000/svg">
                <g onClick={onClick} >
                <circle cx={(LorR=="left")? "70": "200"} cy="200" r={(isEmpha)? "180": "140"}/>
                <text transform={(LorR=="left")? "translate(20,120)": "translate(110,100)"} fill="#DBEDF0">{label}</text>
                </g>
            </svg>
        </div>
    )
};