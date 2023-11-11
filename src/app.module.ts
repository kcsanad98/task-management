import * as Path from 'node:path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users';
import { TasksModule } from './tasks';
import { ControllersModule } from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: parseInt(configService.getOrThrow('POSTGRES_PORT')),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DB'),
        entities: [Path.join(__dirname, '**', '*.entity.{ts,js}')],
        ssl: false,
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    TasksModule,
    ControllersModule
  ]
})
export class AppModule {}
