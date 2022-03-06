export interface BaseDB {
    getAll: () => Promise<{}[]>
    insertItem: <T>(value: T) => Promise<T>
    deleteItem: (id: string) => Promise<void>
    updateItem: <T>(id: string, body: T) => Promise<T>
    getById: <T>(id: string) => Promise<T>
}

export interface DBschema {
    create: <T>(value: T) => Promise<T>
    deleteOne: (id: string) => Promise<void>
    updateOne: <T>(id: string, body: T) => Promise<T>
    getOne: <T>(id: string) => Promise<T>
    count: () => Promise<number>
}
