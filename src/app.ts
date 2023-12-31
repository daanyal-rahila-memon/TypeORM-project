import "reflect-metadata"
import express from "express"
import { DataSource, LessThan } from "typeorm";
import { AppDataSource } from "./db/db.config";
import { studentEntity } from "./entities/student.entity";
import { courseEntity } from "./entities/course.entity";

// Uncomment 'Company' and 'Product' imports for One-To-Many & Many-To-One relationship
// import { Company } from "./entities/Company";
// import { Product } from "./entities/Product";

// Uncomment 'User' & 'Profile' imports for One-To-One relationship
// import { User } from "./entities/User";
// import { Profile } from "./entities/Profile";

const app = express();
app.use('/', async function(req, res) {
    // Workflow of TypeORM: It gets the entity and and make its repository and converts it to SQL, then with the help of Database Driver (in this case: pg) forms the tables of those found entities in the database

    {   // Uncomment this scope to csee One-To-One relationship
        
        // Now getting that repository
        // const userRepository = AppDataSource.getRepository(User);
        // const profileRepository = AppDataSource.getRepository(Profile);

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

        // ---- Delete without relation
        // await userRepository.delete(2); // deleted the record with id = 2;
        // res.send("Record deleted");

        // ---- Delete with relation
        // await profileRepository.delete(11); // can't be done as it is mapped in User as a foriegn key... To delete it you have to enable cascade delete where the relation is made (in User.ts)
        // res.send("Record deleted");

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
    }

    // Uncomment this to see One-To-Many relationship, Many-To-One relationship
    {   // One-To-Many relationship, Many-To-One relationship
        
        // Getting Respository of Company
        // const companyRepository = AppDataSource.getRepository(Company);

        // Inserting

        // let products : Product[] = [];

        // let iPhone : Product = new Product();
        // iPhone.name = "iPhone";
        // iPhone.description = "Smartphone";
        // iPhone.price = 1000;
        
        // let iPad : Product = new Product();
        // iPad.name = "iPad";
        // iPad.description = "Smart Tablet";
        // iPad.price = 2000;

        // let MacBook : Product = new Product();
        // MacBook.name = "MacBook";
        // MacBook.description = "MacBook Pro";
        // MacBook.price = 3000;

        // products.push(iPhone, iPad, MacBook);

        // let company : Company = new Company();

        // company.name = "Apple Inc";
        // company.description = "Apple Inc is an American multinational technology company headquartered in Seattle, WA, United States.";
        // company.products = products;

        // const companyInserted = await companyRepository.save(company);  
        // res.json(companyInserted);

        // Finding

        // const companyFound = await companyRepository.find(); // to get only the company details & the relation is lazy (and not eager - if eager then products will also come along with the company details)

        // const companyFound = await companyRepository.find({ // to get products as well with the company & the relation is lazy (and not eager)
        //     relations: {
        //         products: true
        //     }
        // });

        // const companyFound = await companyRepository.find({ // to add some conditional clause
        //     relations: {
        //         products: true
        //     },
        //     where: {
        //         products: {
        //             price: LessThan(3000)
        //         }
        //     }
        // });

        // res.json(companyFound);

        // Updating

        // const companyFound = await companyRepository.findOne({where : {id: 1}});

        // if (companyFound) {
        //     companyFound.name = "Apple Inc Updated";
        //     console.log("in if company");
        //     for (let x = 0; x < companyFound.products.length; x++) {
        //         companyFound.products[x].price = 10;
        //     }
        //     const updatedCompany = await companyRepository.save(companyFound);
        //     res.json(updatedCompany);
        // }
        // else {
        //     res.send("Company not found");
        // }

        // Deleting
        // await companyRepository.delete(1);
        // res.send("Company deleted");
    }

    {   // Many-To-Many Relationship
        const studentRepository = AppDataSource.getRepository(studentEntity);

        // Insert

        // let course1 = new courseEntity();
        // course1.name = "Angular";
        // course1.description = "Angular is an open-source, front-end framework for building user interfaces";
        // course1.courseCode = "ANG";

        // let course2 = new courseEntity();
        // course2.name = "React";
        // course2.description = "React is a JavaScript library for building user interfaces";
        // course2.courseCode = "REA";

        // let course3 = new courseEntity();
        // course3.name = "Vue";
        // course3.description = "Vue is a progressive JavaScript framework for building user interfaces";
        // course3.courseCode = "VUE";
        
        // let student : studentEntity = new studentEntity();
        // student.name = "Mr.";
        // student.age = 23;
        // student.fatherName = "Daanyal";
        // student.courses = [course1, course2, course3];

        // let student2 : studentEntity = new studentEntity();
        // student2.name = ".Umer";
        // student2.age = 25;
        // student2.fatherName = "Hayat";
        // student2.courses = [];

        // const studentInserted = await studentRepository.save(student2);
        // res.json(studentInserted);

        // Find

        // let students = await studentRepository.find();  // without relation & lazy (For easy add {eager: true} in Student Entity > @ManyToMany())
        let students = await studentRepository.find({relations:["courses"]});  // with relation
        res.json(students);
    }

    // res.send('Hello From Express!');
});

const port = 3002;

AppDataSource.initialize().then(() => {
    console.log("Datbase Connected Succesfully!");
    app.listen(port, () => {
        console.log(`Server is up on ${port}!`);
    });
}).catch((error) => console.log("errorMessage: Error Connecting Database", error));