import path from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "typeorm_db",
    entities: [path.join(__dirname,"..","entities/*entity{.ts,.js}")],   // database will look for 'entities' in the 'entities directory'; all the files having '.ts' or '.js' in the 'entities directory'
    synchronize: true, // it will keep the follow up with all the changes made in files and then keep it sunc with the database
    logging: true,  // now we'd be able to see all tthe logs coming from typorm
})

// Comment above part Many To Many Relationship & uncomment below part for any of the others
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "postgres",
//     database: "typeorm_db",
//     entities: ["src/entities/*{.ts,.js}"],   // database will look for 'entities' in the 'entities directory'; all the files having '.ts' or '.js' in the 'entities directory'
//     synchronize: true, // it will keep the follow up with all the changes made in files and then keep it sunc with the database
//     logging: true,  // now we'd be able to see all tthe logs coming from typorm
// });