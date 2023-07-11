import "reflect-metadata"
import express from "express"
import { DataSource } from "typeorm";
import { User } from "./entities/User";

const app = express();
app.use('/', async function(req, res) {
    // Workflow of TypeORM: It gets the entity and and make its repository and converts it to SQL, then with the help of Database Driver (in this case: pg) forms the tables of those found entities in the database

    // Now getting that repository
    const userRepository = AppDataSource.getRepository(User);

    // using that repository, now find all records in that repository/User table/entity in the database

    // Get All the records
    // const allRecords = await userRepository.find(); // if we don't privide anything in the parameter of find(), it'll result all the rows in the table; but if we provide some id, it will return only that row as per id
    // res.json(allRecords);

    // Get a single record
    // const record = await userRepository.findOne({ where: { firstName: "Daanyal" }});
    // res.json(record);

    // Delete
    // await userRepository.delete(2); // deleted the record with id = 2;
    // res.send("Record deleted");

    // Insert
    // let user: User = new User();
    // user.firstName = "John";
    // user.lastName = "Doe";
    // user.email = "john@gmail.com";

    // const userInserted = await userRepository.save(user);
    // res.json(userInserted);

    // Update
    // await userRepository.update(12, { firstName: "John Updated", lastName: "Doe Updated", email: "updated@gmail.com" });
    // res.send("Record updated");

    // res.send('Hello From Express!');
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