import { DataSource } from 'typeorm';


import * as dotenv from 'dotenv';
import { Article } from './article/entity/article.entity';
import { Titulo } from './article/entity/titulo.entity';
import { Seccion } from './article/entity/seccion.entity';


dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  entities: [Article , Titulo , Seccion],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});
