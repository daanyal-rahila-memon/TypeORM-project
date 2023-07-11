import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "course"})
export class courseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    courseCode: string;
}