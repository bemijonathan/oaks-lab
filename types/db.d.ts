export interface BaseDB {
    getAll: () => Promise<{}[]>
    insertItem: <T>(value: T) => Promise<T>
    deleteItem: (id:string) => Promise<void>
    updateItem: <T>(id:string, body: T) => Promise<T>
    getById: <T>(id:string) => Promise<T>
}


