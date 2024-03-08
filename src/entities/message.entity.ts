/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
/**Creacion de entidad messagen para la base de datos */
@Entity()
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nick: string;

    @Column()
    message:string;

    /*@CreateDateColumn()
    createdAt: Date;*/
}
