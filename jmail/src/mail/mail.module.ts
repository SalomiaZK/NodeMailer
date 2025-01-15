import { Module } from '@nestjs/common';
import {  MailService } from './mail.service';
import { MailsController } from './mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from './mail.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:  [TypeOrmModule.forFeature([MailEntity]), ConfigModule], 
  providers: [MailService], 
  controllers : [MailsController]
})
export class MailModule {}
