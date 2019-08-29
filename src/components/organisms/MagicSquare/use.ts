import { useEffect, useState } from "react";
import useReactRouter from "use-react-router";

import { IState, IBoard } from "../Board";
import { IsGameFinished } from "../../../logics/util/board";

export const createBoard = (level = 3) => {
    const initialState: IBoard = [
        { value: 5, type: "static" },
        { value: 0, type: "variable" },
        { value: 5, type: "static" },
        { value: 0, type: "variable" },
        { value: 5, type: "static" },
        { value: 0, type: "variable" },
        { value: 5, type: "static" },
        { value: 5, type: "static" },
        { value: 5, type: "static" }
    ]

    const answerState: IBoard = [
        { value: 5 },
        { value: 5 },
        { value: 5 },
        { value: 5 },
        { value: 5 },
        { value: 5 },
        { value: 5 },
        { value: 5 },
        { value: 5 }
    ]

    return [initialState,
        answerState];
}

const clearAllInterval = (intervalIdArray: NodeJS.Timeout[]): NodeJS.Timeout[] => {
    intervalIdArray.forEach(target => {
        clearInterval(target);
    });
    return [];
}

function* readyCount() {
    yield "3";
    yield "2";
    yield "1";
}

let startTime = 0;
let intervalId: NodeJS.Timeout[] = [];
let initialState: IBoard = [
    { value: 5, type: "static" },
    { value: 0, type: "variable" },
    { value: 5, type: "static" },
    { value: 0, type: "variable" },
    { value: 5, type: "static" },
    { value: 0, type: "variable" },
    { value: 5, type: "static" },
    { value: 5, type: "static" },
    { value: 5, type: "static" }
];
let answerState: IBoard = [
    { value: 5 },
    { value: 5 },
    { value: 5 },
    { value: 5 },
    { value: 5 },
    { value: 5 },
    { value: 5 },
    { value: 5 },
    { value: 5 }
];

export const useMagicSquare = () => {
    const [state, setState] = useState<IState>("standby");
    const [time, setTime] = useState<string>("0");
    const [stateBoard, setStateBoard] = useState<IBoard>(initialState);
    const { location } = useReactRouter();

    useEffect(() => {
        switch (state) {
            case "standby":
                console.log("standby !!");
                [initialState, answerState] = createBoard();
                setStateBoard(initialState);
                intervalId = clearAllInterval(intervalId);
                let readyCounter = readyCount();
                let id = setInterval(() => {
                    let val = readyCounter.next();
                    if (!val.done) {
                        setTime(val.value);
                    } else {
                        startTime = Date.now();
                        setState("playing");
                        clearInterval(id);
                    }
                }, 1000)
                break;
            case "playing":
                console.log("playing !!");
                intervalId.push(setInterval(() => {
                    setTime((Math.round((Date.now() - startTime) / 100) / 10).toFixed(1));
                }, 100));
                console.log(intervalId);
                break;
            case "finished":
                console.log("finished !!", Date.now() - startTime);
                setTime(((Date.now() - startTime) / 1000).toFixed(3));
                intervalId = clearAllInterval(intervalId);
                break;
        }
    }, [state]);

    useEffect(() => {
        if (IsGameFinished(stateBoard, answerState)) setState("finished");
    }, [stateBoard]);

    useEffect(()=>{
        if(location.pathname=="/game"){
            setState("standby");
        }
    },[location.pathname])
    

    return {
        state,
        setState,
        time,
        stateBoard,
        setStateBoard
    };
}