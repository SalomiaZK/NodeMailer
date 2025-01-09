import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config : TypeOrmModuleOptions = {
    type :  'postgres',
      host: 'localhost',
      port : 5432,
      username: 'postgres',
      password:'hello',
      database: 'jmaildb', 
      entities : ["dist/**/*.entity{.ts,.js}"], 
      synchronize: true
}