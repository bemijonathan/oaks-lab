import { BaseDB } from "../types/db";
import * as fs from 'fs/promises';
import * as path from "path";
import * as crypto from "crypto";

export class DataBase implements BaseDB {
    /**
     * the name of the Database
     * @param dbName
     */
    constructor(dbName: string) {
        this.dbName = dbName
        this.filePath = path.resolve(__dirname, `/database/${dbName}.json`)
        this.initialize().then()
    }

    dbName: string
    private filePath: string

    /**
     * intializes the creation of the DB
     * @param dbName
     * @private
     */
    private async initialize() {
        try {
            const dbDetails = await fs.stat(this.filePath);
            if (!dbDetails) {
                await fs.writeFile(this.filePath, JSON.stringify({}))
            }
        } catch (e) {
            process.exit(1)
        }
    }

    private generateId() {
        return crypto.randomBytes(4).toString('hex');
    }

    /**
     *
     * @private
     */
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
        const newInfo = await this.readData()
        const id = this.generateId()
        newInfo.push({ id: id, ...data })
        await this.writeData(newInfo)
        return newInfo
    }

    public async updateItem<T>(id: string | number, data: T) {
        const newInfo = await this.readData()
        const index = newInfo.findIndex((d: { id: string | number }) => d.id === id)
        newInfo[index] = { id: id, ...data }
        await this.writeData(newInfo)
        return newInfo
    }
}