import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailEntity } from './mail.entity';

@Controller('mails')
export class MailsController {
    constructor( private readonly mailService : MailService){

    }

    @Get()
    async findAll() : Promise<MailEntity[]>{
        return this.mailService.findAll()
     }

     @Get("newMessages")
     async findNewMessages () : Promise<MailEntity[]>{
         return this.findNewMessages();
     } 

     @Post("send")
     async sendMail (@Body() toSend : MailEntity) : Promise <Object>{
        return this.mailService.sendMail(toSend)
     }
}
