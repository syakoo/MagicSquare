import { getDB, setDB } from "./fireStore";
import { Imode } from "../../types";

export interface IAnalysis {
    num: number;
    ave: number;
}

export const setAnalysis = (mode: Imode, time: number) => {
    getAnalysis(mode).then(data => {
        data.num += 1;
        data.ave = (data.ave * (data.num - 1) + time) / data.num;
        setDB("analysis", mode, data);
    });
}

export const getAnalysis = async (mode: Imode) => {
    let ret: IAnalysis = {
        num: 0,
        ave: 0,
    };
    await getDB("analysis").then(snapshot => {
        ret.num = snapshot[mode].num;
        ret.ave = snapshot[mode].ave;
    })

    return ret
}