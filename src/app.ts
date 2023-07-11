import "reflect-metadata"
import express from "express"
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Profile } from "./entities/Profile";

const app = express();
app.use('/', async function(req, res) {
    // Workflow of TypeORM: It gets the entity and and make its repository and converts it to SQL, then with the help of Database Driver (in this case: pg) forms the tables of those found entities in the database

    // Now getting that repository
    const userRepository = AppDataSource.getRepository(User);
    const profileRepository = AppDataSource.getRepository(Profile);

    // using that repository, now find all records in that repository/User table/entity in the database

    // Get All the records

        // ---- Get records of 'User' from the database
    // const allRecords = await userRepository.find(); // if we don't privide anything in the parameter of find(), it'll result all the rows in the table; but if we provide some id, it will return only that row as per id
    
        // ---- Get records of 'Profile' from the database
    // const allRecords = await profileRepository.find(); // if we don't privide anything in the parameter of find(), it'll result all the rows in the table; but if we provide some id, it will return only that row as per id

        // ---- Get records of 'User' with 'join' of profile from the database
    // const allRecords = await userRepository.find({ relations: { profile: true } }); // we mentioned to get the realtion to it to get the relation/join of profile as it was 'lazy' by default
    // const allRecords = await userRepository.find(); // we don't have to mention if the relation is eager -- check User.ts for further understanding

    // res.json(allRecords);

    // Get a single record
    // const record = await userRepository.findOne({ where: { firstName: "Daanyal" }});
    // res.json(record);

    // Delete
    // await userRepository.delete(2); // deleted the record with id = 2;
    // res.send("Record deleted");

    await profileRepository.delete(11); // can't be done as it is mapped in User as a foriegn key... To delete it you have to enable cascade delete where the relation is made (in User.ts)
    res.send("Record deleted");

    // Insert

    // let profile : Profile = new Profile();
    // profile.gender = "male";
    // profile.photo = "this is the profile photo";
    
    // // const profileInserted = await profileRepository.save(profile);  // instead of inserting profile into the database and then joining it with the user row, just add cascade: true in User profile and delete thi line and just pass the profile object in the user.profile; cascade will then insert profile into the database and then join it with the user row.profile

    // let user: User = new User();
    // user.firstName = "John";
    // user.lastName = "Doe";
    // user.email = "john@gmail.com";
    // user.profile = profile;

    // const userInserted = await userRepository.save(user);
    // res.json(userInserted);

    // Update
    
    // ---- Update without join
    // await userRepository.update(12, { firstName: "John Updated", lastName: "Doe Updated", email: "updated@gmail.com" });
    // res.send("Record updated");

    // ---- Update with join
    // const userFound = await userRepository.findOne({ where: { id: 4 }});

    // if (userFound) {
    //     userFound.firstName = "updated";
    //     userFound.lastName = "updated";
    //     userFound.email = "updated@gmail.com";
    //     userFound.profile.gender = "male updated";
    //     userFound.profile.photo = "this is the updated profile photo";
        
    //     const updatedUser = await userRepository.save(userFound);   // if you provide something in the parameter with save, it'll update at particular id or else it will insert
    //     res.json(updatedUser);
    // }
    // else {
    //     res.send("Record not found");
    // }

    // res.send('Hello From Express!');
});

const port = 3001;

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