import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailEntity } from './mail.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer'
import { dotenvValues } from 'src/config/env.config';


@Injectable()
export class MailService {
     private transporter: nodemailer.Transporter // cree 

     constructor(
          @InjectRepository(MailEntity) // injection de dependance
          private mailRepository: Repository<MailEntity>
     ) {
          this.transporter = nodemailer.createTransport({
               service: 'gmail',
               host: 'smtp.gmail.com',
               port: 465,
               secure: true,
               auth: {
                    user: dotenvValues.forwader,
                    pass: dotenvValues.password
               }
          })

     }
     async findAll(): Promise<MailEntity[]> {
          return this.mailRepository.find()
     }
     async sendMail(toSend: MailEntity): Promise<Object> {
          const mailOption = {
               "from": dotenvValues.forwader,
               to: toSend.to,
               subject: toSend.subject,
               text: toSend.text

          }
          try {
               const info = await this.transporter.sendMail(mailOption)
                    this.mailRepository.create(toSend)
               return {
                    "status": "email sent" + info.messageId,
                    "mail": toSend

               }



          } catch (error){
               console.error('error sending the mail :' , error)
               throw new Error('L\'email n\'a pas pu être envoyé'); // Remonte l'erreur
          }
     }
}
