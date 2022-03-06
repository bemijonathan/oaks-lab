import glob from 'glob'


export const initilizeDB = () => {
    new Promise((resolve, reject) => {
        // select all the other schema in the db folder and call their initilize function
        glob(__dirname + '/../**/*.schema.ts', function (err, res) {
            if (err) {
                reject(err)
            } else {
                Promise.all(
                    res.map(file => {
                        return import(file.replace(__dirname, '.').replace('.ts', ''))
                    })
                ).then(modules => {
                    resolve(modules)
                })
            }
        })
    }).then(modules => {
        try {
            //  for each module initialize the data to create the corresponding documents
            (modules as any[]).forEach(schema => {
                console.log('schema', schema);
                let classObject = schema[Object.keys(schema)[0]]
                new classObject(Object.keys(schema)[0])
            })
        } catch (error) {
            console.log(error)
            console.log((error as any).message, 'error creating database objects!!!')
        }
    })

}