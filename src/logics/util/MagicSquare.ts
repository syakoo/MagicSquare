import { IBoard } from "../../types";

type MSquare = number[];

const convertIntoArray = (Array2D: number[][], rotate: number) :number[] => {
    let ret = [];

    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            switch(rotate){
                case 1:
                    ret.push(Array2D[2-j][i]);
                    break;
                case 2:
                    ret.push(Array2D[2-i][2-j]);
                    break;
                case 3:
                    ret.push(Array2D[j][2-i]);
                    break;
                default:
                    ret.push(Array2D[i][j]);
            }
        }
    }
    return ret
}

const getMagicSquare = (): MSquare => {
    let rd = Math.floor(Math.random()*2);
    let ms = (rd===0)? [[2, 9, 4], [7, 5, 3], [6, 1, 8]]: [[8, 3, 4], [1, 5, 9], [6, 7, 2]];
    rd = Math.floor(Math.random()*4);
    return convertIntoArray(ms, rd);
}

const randomShuffle = (): number[] => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let a = arr.length;

    while (a) {
        const j = Math.floor(Math.random() * a);
        const t = arr[--a];
        arr[a] = arr[j];
        arr[j] = t;
    }

    return arr;
}

export const getProblem = (level: number) => {
    let pMS: IBoard = [];
    let aMS: IBoard = [];

    let ms = getMagicSquare();

    for (let i = 0; i < ms.length; i++) {
        pMS.push({ value: ms[i], type: "static" });
        aMS.push({ value: ms[i] });
    }

    const hiddenList = randomShuffle();

    for (let i = 0; i < level; i++) {
        pMS[hiddenList[i]] = { value: 0, type: "variable" };
    }

    return [pMS, aMS];
}