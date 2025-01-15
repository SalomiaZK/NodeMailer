import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailEntity } from './mail.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer'
import { dotenvValues } from 'src/config/env.config';
import * as Imap from "imap-simple"
import { CreateMailDto } from 'src/dto/createMailDto';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

// Charger le fichier .env à partir du sous-dossier config

@Injectable()
export class MailService {
     private transporter: nodemailer.Transporter
     // cree 
     private config = {
          imap: {
               user: dotenvValues.forwader,
               password: dotenvValues.password,
               host: 'imap.gmail.com',
               port: 993,
               tls: true
          }
     }

     constructor(
          private readonly configService : ConfigService,
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
     async sendMail(toSend: CreateMailDto): Promise<Object> {

          let theMailTobeSent = new MailEntity(
               uuidv4(),
               dotenvValues.forwader,
               toSend.to,
               "sent",
               toSend.subject,
               toSend.text
          )

          const maiOption = {
               from: dotenvValues.forwader,
               to : toSend.to,
               subject: toSend.subject,
               text: toSend.text
          }

           
          try {
               const info = await this.transporter.sendMail(maiOption)
               this.mailRepository.create(theMailTobeSent)
               return {
                    "status": "email sent" + info.messageId,
                    "mail": theMailTobeSent

               }



          } catch (error) {
               console.log("password",this.configService.get<string>('DATABASE_PASSWORD'))
               console.log("config", this.configService.get<string>('PASSWORD'))
          }


     }

     async checkNewEmails() {
          try {

               let newEmails = []
               const connection = await Imap.connect(this.config)

               await connection.openBox("INBOX")
               const messages = await connection.search(["UNSEEN"], {
                    bodies: ['HEADER FIELD (FROM TO SUBJECT DATE)', 'TEXT']
               })


               for (const message of messages) {
                    const email = {
                         subject: message.parts[0].body.subject[0],
                         from: message.parts[0].body.from[0],
                         body: message.parts[0].body

                    }

                    await this.mailRepository.save(email)
                    newEmails.push(email)

                    return newEmails
               }
               connection.end()
          } catch (error) {
               console.error("error pendant la recuperation des messages")
          }
     }
}