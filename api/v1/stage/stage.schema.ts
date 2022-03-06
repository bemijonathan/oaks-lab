import { DataBase } from "../../../db/_base";


export interface IStages {
    name: string
    token: string
    stageCount: number
}

export class Stages extends DataBase {
    constructor(database: string) {
        super(database);
    }
}