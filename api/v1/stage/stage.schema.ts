import { DataBase } from "@/db/_base";
import { IStep } from "../step/step.schema";


export interface IStage {
    id: string;
    name: string,
    completed: boolean,
    steps: IStep[]
}

class StageSchema extends DataBase {
    constructor(database: string) {
        super(database);
    }

    tableSchema() {
        return {
            name: 'string',
            completed: 'boolean',
        }
    }

}

export const stageSchema = new StageSchema('stage')

