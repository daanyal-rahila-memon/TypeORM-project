import "reflect-metadata"
import express from "express"
import { DataSource } from "typeorm";

const app = express();
app.use('/', function(req, res) {
    res.send('Hello From Express!');
});

const port = 3000;

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "typeorm_db",
    entities: ["src/entities/*{.ts,.js}"],   // database will look for 'entities' in the 'entities directory'; all the files having '.ts' or '.js' in the 'entities directory'
    synchronize: true, // it will keep the follow up with all the changes made in files and then keep it sunc with the database
    logging: true,  // now we'd be able to see all tthe logs coming from typorm
});

AppDataSource.initialize().then(() => {
    console.log("Datbase Connected Succesfully!");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });
}).catch((error) => console.log("errorMessage: Error Connecting Database", error));