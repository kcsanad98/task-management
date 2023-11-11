import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());

  const host = process.env['API_HOST'];
  const port = process.env['API_PORT'];

  await app.listen(port, host);
}
bootstrap();
