import { Module } from '@nestjs/common';
import {  MailService } from './mail.service';
import { MailsController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from './mail.entity';


@Module({
  imports:  [TypeOrmModule.forFeature([MailEntity])], 
  providers: [MailService], 
  controllers : [MailsController]
})
export class MailModule {}
