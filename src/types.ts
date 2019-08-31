
export interface ICell {
    value: number;
    key?: number;
    id?: number;
    type?: "static" | "variable";
    clickEventHandler?: () => void;
}

export type IBoard = ICell[];