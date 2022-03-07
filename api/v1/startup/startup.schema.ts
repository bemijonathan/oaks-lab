import { DataBase } from "@/db/_base";


export interface Istartup {
    id: string
    name: string
    startUpId: string
}

class startup extends DataBase {
    constructor(database: string) {
        super(database);

    }
    tableSchema() {
        return {
            name: 'string',
            startUpId: 'string'
        }
    }
}

export const startupSchema = new startup('startup')