import { DataBase } from "./_base";
import { ApiError } from "../utils";

export class Stages {
    constructor(database: string) {
        this.db = new DataBase(database);
    }

    private db: DataBase;

    private validateSchema<T>(schema: T): { success: boolean, message?: string } {
        return { success: true };
    }

    // private schema: {
    //     id: number,
    //     name: string,
    //     description: string,
    //     created_at: Date,
    //     updated_at: Date,
    // }

    public async create<T>(schema: T): Promise<T> {
        const validateSchema = this.validateSchema(schema)
        if (!validateSchema.success) {
            throw new ApiError(validateSchema.message as string);
        }
        await this.db.insertItem(schema);
        return schema;
    }

}