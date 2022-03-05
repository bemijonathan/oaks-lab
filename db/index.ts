import {Stages} from "./stages";

export * from './startup'
export * from './stages'
export * from './steps'

import glob from 'glob'


export const initilizeDB = () => {
    // select all the other files in the db folder and call their initilize function
    // const dbFiles = require.context('./', true, /^(?!.*index||_base).*\.ts$/);

    // dbFiles.keys().forEach(dbFile => {
    //     const db = dbFiles(dbFile).default;
    //     db.initilize();
    // });

    // console.log('dbFiles', dbFiles);


    new Promise((resolve, reject) => {
        glob(__dirname + '/**/*.ts', function (err, res) {
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
        // do stuff

        console.log('modules', modules);
    })

}