import { useEffect, useState } from "react";
import useReactRouter from "use-react-router";

import { IBoard, IState } from "../../../types";
import { getProblem } from "../../../logics/util/MagicSquare";
import { IsGameFinished } from "../../../logics/util/board";

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
                [initialState, answerState] = getProblem(4);
                setStateBoard(initialState);
                break;
            case "playing":
                console.log("playing !!");
                break;
            case "finished":
                console.log("finished !!");
                break;
            case "gameover":
                console.log("gameover !!");
                break;
        }
    }, [state]);

    useEffect(() => {
        if (IsGameFinished(stateBoard, answerState)) setState("finished");
    }, [stateBoard]);

    useEffect(() => {
        if (location.pathname === "/game") {
            setState("standby");
        }
    }, [location.pathname])


    return {
        state,
        setState,
        time,
        setTime,
        stateBoard,
        setStateBoard
    };
}