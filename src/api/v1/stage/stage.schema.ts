import { DataBase } from "@/src/db/_base";
import { IStep } from "../step/step.schema";


export interface IStage {
    id: string;
    name: string,
    completed: boolean,
    steps: IStep[]
    startUpId: string,
    locked: boolean
}

class StageSchema extends DataBase {
    constructor(database: string) {
        super(database);
    }

    tableSchema() {
        return {
            name: 'string',
            completed: 'boolean',
            startUpId: 'string',
            locked: 'boolean'
        }
    }

}

export const stageSchema = new StageSchema('stage')

