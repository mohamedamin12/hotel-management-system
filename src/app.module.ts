import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",
          database: config.get<string>("DB_DATABASE"),
          username: config.get<string>("DB_USERNAME"),
          password: config.get<string>("DB_PASSWORD"),
          port: config.get<number>("DB_PORT"),
          host: 'localhost',
          synchronize: process.env.NODE_ENV !== 'production',
          // entities: []
        };
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.development"
      // envFilePath: process.env.NODE_ENV !== 'production' ? `.env.${process.env.NODE_ENV}` : ".env"
    }),
  ],

})
export class AppModule {}
