import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './article/config';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ArticleModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: envs.dbHost,
      // port: envs.port,
      // username: envs.dbUser,
      // password: envs.dbPassword,
      // database: envs.dbName,
       url: envs.dbUrl, // <- cadena completa de conexión desde .env
      ssl: {
        rejectUnauthorized: false, // necesario para Neon
      },

      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migration/*.js'],
      synchronize: true,
    }),
    LoginModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // Servicio adicional para verificar la conexión
    {
      provide: 'DATABASE_CONNECTION_LOGGER',
      useFactory: async () => {
        const logger = new Logger('Database');

        setTimeout(() => {
          logger.log(
          
            `🗄️  Conectado a PostgreSQL en: ${envs}:${envs.dbUrl}`,
           //  `🗄️  Conectado a PostgreSQL en: ${envs}:${envs.port}/${envs.dbName}`,
          );
          logger.debug('✅ ¡Conexión exitosa!');
        }, 1000);
      },
    },
  ],
})
export class AppModule {}
