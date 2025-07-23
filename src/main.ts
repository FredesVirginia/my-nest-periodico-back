// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//    app.useGlobalPipes(new ValidationPipe());
//    app.enableCors(); 
//   await app.listen(process.env.PORT ?? 3020);
// }
// bootstrap();


// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

export async function createNestApp(expressInstance: express.Express) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.init(); // 👈 ¡Sin app.listen()!
  return app;
}

