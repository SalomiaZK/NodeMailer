import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailEntity } from './mail.entity';
import { Repository } from 'typeorm';


@Injectable()
export class MailService {

    constructor(
         @InjectRepository (MailEntity) // injection de dependance
         private mailRepository : Repository <MailEntity> // cree 
    ){}
    async findAll() : Promise <MailEntity[]> {
            return this.mailRepository.find()
}
     async sendMail(toSend : MailEntity) : Promise<MailEntity> {
          
          return this.mailRepository.create(toSend);
     }
}
