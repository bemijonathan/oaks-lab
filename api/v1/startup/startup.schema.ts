import { DataBase } from "../../../db/_base";


export interface IStartup {
    name: string
    token: string
    stageCount: number
}

export class StartUp extends DataBase implements IStartup {
    constructor(database: string) {
        super(database);

    }
    name!: string;
    token!: string;
    stageCount!: number;
}