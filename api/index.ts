// api/index.ts (o js si no usás TS directamente aquí)


// api/index.ts
import express from 'express';
import serverless from 'serverless-http';
const { createNestApp } = require('../dist/main');

const app = express();

let serverlessHandler: any;

async function bootstrap() {
  await createNestApp(app);
  serverlessHandler = serverless(app);
}

bootstrap();

export const handler = async (event: any, context: any) => {
  if (!serverlessHandler) await bootstrap();
  return serverlessHandler(event, context);
};



