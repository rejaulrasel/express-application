import express from 'express'
import mongoose from 'mongoose'
import config from './app/config';
const app = express()
const port = 3000;

//database connection
async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
        })
    } catch (error) {
        console.log(error)
    }
}





main()