import { DataSource } from 'typeorm';


import * as dotenv from 'dotenv';
import { Article } from './article/entity/article.entity';

import { Seccion } from './article/entity/seccion.entity';
import { BloqueContenido } from './article/entity/bloqueContenido';
import { User } from './login/entity/user.entity';


dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  entities: [Article , Seccion , BloqueContenido , User],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});
