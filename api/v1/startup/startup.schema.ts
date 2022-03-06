import { DataBase } from "../../../db/_base";


export interface IStartup {
    name: string
    token: string
    stageCount: number
}

class StartUp extends DataBase {
    constructor(database: string) {
        super(database);

    }
    tableSchema() {
        return {
            name: 'string',
            token: 'string',
            stageCount: 'number',
            createdAt: 'string',
            updatedAt: 'string',
            createdBy: 'string'
        }
    }
}

export const startUpSchema = new StartUp('startup')