import { DataBase } from "@/db/_base";


export interface IStage {
    name: string,
    subStages: [],
    createdAt: string,
    updatedAt: string,
}

class StageSchema extends DataBase {
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

export const stageSchema = new StageSchema('stage')

