// api/index.ts (o js si no usás TS directamente aquí)


// api/index.ts
import * as express from 'express';
import { createNestApp } from '../src/main';
import serverless from 'serverless-http';

const expressApp = express();

createNestApp(expressApp); // Inicializa Nest en Express

export const handler = serverless(expressApp);
