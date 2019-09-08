import { IBoard, Imode } from "../../types";

type MSquare = number[];

const convertIntoArray = (Array2D: number[][], rotate: number): number[] => {
    let ret = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            switch (rotate) {
                case 1:
                    ret.push(Array2D[2 - j][i]);
                    break;
                case 2:
                    ret.push(Array2D[2 - i][2 - j]);
                    break;
                case 3:
                    ret.push(Array2D[j][2 - i]);
                    break;
                default:
                    ret.push(Array2D[i][j]);
            }
        }
    }
    return ret
}

const getMagicSquare = (): MSquare => {
    let rd = Math.floor(Math.random() * 2);
    let ms = (rd === 0) ? [[2, 9, 4], [7, 5, 3], [6, 1, 8]] : [[8, 3, 4], [1, 5, 9], [6, 7, 2]];
    rd = Math.floor(Math.random() * 4);
    return convertIntoArray(ms, rd);
}

const randomShuffle = (arr: number[]): number[] => {
    let a = arr.length;

    while (a) {
        const j = Math.floor(Math.random() * a);
        const t = arr[--a];
        arr[a] = arr[j];
        arr[j] = t;
    }

    return arr;
}

export const getProblem = (mode: Imode) => {
    let pMS: IBoard = [];
    let aMS: IBoard = [];

    let ms = getMagicSquare();

    for (let i = 0; i < ms.length; i++) {
        pMS.push({ value: ms[i], type: "static" });
        aMS.push({ value: ms[i] });
    }

    switch (mode) {
        case "normal":
            const hiddenList = randomShuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]);

            for (let i = 0; i < 4; i++) {
                pMS[hiddenList[i]] = { value: 0, type: "variable" };
            }
            break;
        case "hard":
            const shuffleCell = randomShuffle([0, 1, 2, 3, 5, 6, 7, 8]);
            let visibleList = [shuffleCell[0], shuffleCell[1]];
            if (visibleList[0] + visibleList[1] === 8) {
                visibleList[1] = shuffleCell[2];
            }
            for (let i = 0; i < 9; i++) {
                if (i !== visibleList[0] && i !== visibleList[1]) {
                    pMS[i] = { value: 0, type: "variable" };
                }
            }
            break;

    }


    return [pMS, aMS];
}