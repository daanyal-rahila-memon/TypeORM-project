import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    // by default any relation is lazy, we have to mentinon it to load, to make it eager (load automatically) we have to mentio it - for reference check the line below
    @OneToOne(() => Profile, { cascade: true, eager: true, onDelete: "CASCADE" })
    @JoinColumn()
    profile: Profile
}