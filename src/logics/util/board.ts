import {IBoard} from "../../types";

export const IsGameFinished = (boardState: IBoard, answerState: IBoard): Boolean => {
    for(let i=0; i<boardState.length; i++){
        if (boardState[i].value !== answerState[i].value) {
            return false;
        }
    }
    return true;
}