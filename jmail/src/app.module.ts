import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import 'dotenv/config';
import {config} from './typeOrm.config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from './mail/mail.entity';

@Module({
  imports: [MailModule, TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([MailEntity]) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


console.log(process.env.DATABASE_PASSWORD);

