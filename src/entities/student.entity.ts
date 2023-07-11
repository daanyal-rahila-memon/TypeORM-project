import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { courseEntity } from "./course.entity";

@Entity({name: "student"})
export class studentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    fatherName: string;

    @ManyToMany(() => courseEntity, {cascade: true})
    @JoinTable({name: "student_courses"})
        courses: courseEntity[];
}