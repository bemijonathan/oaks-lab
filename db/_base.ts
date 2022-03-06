import { BaseDB } from "../types/db";
import * as fs from 'fs/promises';
import * as crypto from "crypto";

export class DataBase implements BaseDB {
    /**
     * the name of the Database
     * @param dbName
     */
    constructor(dbName: string) {
        try {
            this.dbName = dbName
            this.filePath = __dirname + `/database/${dbName}.json`
            this.initialize().then()
        } catch (error) {
            console.log(error)
        }
    };
    tableSchema() {
        return {}
    }
    dbName!: string;
    private filePath!: string;

    /**
     * intializes the creation of the DB
     * @param dbName
     * @private
     */
    private async initialize() {
        try {
            await fs.access(this.filePath);
        } catch (e: any & { code: string }) {
            if (e.code === 'ENOENT') {
                await fs.writeFile(this.filePath, JSON.stringify([])).catch(e => console.log(e))
            }
        }
    }

    private generateId() {
        return crypto.randomBytes(4).toString('hex');
    }

    private validateSchema<T>(schema: T) {
        const tableSchema = this.tableSchema() as any
        const schemaKeys = Object.keys(schema)
        for (const key of schemaKeys) {
            if (typeof (schema as any)[key] !== tableSchema[key]) {
                throw new Error(`${key} is not a valid type`)
            }
        }
    }

    private async readData() {
        const data = await fs.readFile(this.filePath)
        return JSON.parse(data.toString())
    }

    private async writeData<T>(data: T) {
        await fs.writeFile(this.filePath, JSON.stringify(data))
    }


    public getAll() {
        return this.readData()
    }

    public async getById(id: string | number) {
        const data = await this.readData();
        return data.find((d: { id: string | number; }) => d.id === id)
    }

    public async deleteItem(id: string | number) {
        const data = await this.readData();
        data.filter((data: { id: string | number; }) => data.id != id)
        await this.writeData(data)
    }

    public async insertItem<T>(data: T) {
        this.validateSchema(data)
        const newInfo = await this.readData()
        const id = this.generateId()
        newInfo.push({ id: id, ...data })
        await this.writeData(newInfo)
        return newInfo
    }

    public async updateItem<T>(id: string | number, data: T) {
        this.validateSchema(data)
        const newInfo = await this.readData()
        const index = newInfo.findIndex((d: { id: string | number }) => d.id === id)
        newInfo[index] = { id: id, ...data }
        await this.writeData(newInfo)
        return newInfo
    }
}