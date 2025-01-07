import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class MailEntity{
    @PrimaryGeneratedColumn()
   id_mail: string;

    @Column()
    from : string;

    @Column()
    to : string
    
    @Column()
    type : "sent" | "receivedS"


    @Column()
    subject: string;
    
    @Column()
    text : string;
}