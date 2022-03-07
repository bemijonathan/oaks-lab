import { DataBase } from "@/src/db/_base";


export interface IStep {
    id: string
    name: string
    completed: boolean
    stageId: string
}

class Step extends DataBase {
    constructor(database: string) {
        super(database);

    }
    tableSchema() {
        return {
            name: 'string',
            completed: 'boolean',
            stageId: 'string'
        }
    }
}

export const stepSchema = new Step('step')