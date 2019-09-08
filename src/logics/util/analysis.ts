import { getDB, setDB } from "./fireStore";
import { Imode } from "../../types";

export interface IAnalysis {
    num: number;
    sum: number;
}

export const setAnalysis = (mode: Imode, time: number) => {
    getAnalysis(mode).then(data => {
        data.num += 1;
        data.sum += time;
        setDB("analysis", mode, data);
    });
}

export const getAnalysis = async (mode: Imode) => {
    let ret: IAnalysis = {
        num: 0,
        sum: 0,
    };
    await getDB("analysis").then(snapshot => {
        ret.num = snapshot[mode].num;
        ret.sum = snapshot[mode].sum;
    })

    return ret
}