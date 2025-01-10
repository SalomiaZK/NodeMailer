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

    constructor(id : string,from: string, to: string, type: "sent" | "receivedS", subject: string, text: string) {
        this.id_mail = id,
        this.from = from;
        this.to = to;
        this.type = type;
        this.subject = subject;
        this.text = text;
    }
}