export interface BaseDB {
    getAll: () => Promise<{}[]>
    insertItem: <T>(value: T) => Promise<T>
    deleteItem: (id: string) => Promise<void>
    updateItem: <T>(id: string, body: T) => Promise<T>
    getById: <T>(id: string) => Promise<T>
    findMany: <T>(query: T) => Promise<T[]>
    findOne: <T>(query: T) => Promise<T>
}

export interface DBschema {
    create: <T>(value: T) => Promise<T>
    deleteOne: (id: string) => Promise<{}>
    updateOne: <T>(id: string, body: T) => Promise<T>
    getOne: <T>(id: string) => Promise<T>
    count: () => Promise<number>
}
