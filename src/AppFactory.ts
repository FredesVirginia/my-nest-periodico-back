// src/AppFactory.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

class AppFactory {
  public expressApp: express.Express;
  public appPromise: Promise<any>;

  constructor() {
    this.expressApp = express();
    // Creamos la app Nest sobre Express para exportarla
    this.appPromise = (async () => {
      const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(this.expressApp),
      );
      app.enableCors(); // Habilitar CORS, ajustar según necesidad
      await app.init(); // Inicializar Nest (sin escuchar en puerto)
      return app;
    })();
  }

  static create() {
    const instance = new AppFactory();
    return {
      expressApp: instance.expressApp,
      appPromise: instance.appPromise,
    };
  }
}

export { AppFactory };
