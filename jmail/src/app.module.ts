import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import 'dotenv/config';
import { config } from './config/typeOrm.config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailEntity } from './mail/mail.entity';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [MailModule,
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([MailEntity]),
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


