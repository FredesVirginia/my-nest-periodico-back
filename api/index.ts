// api/index.ts (o js si no usás TS directamente aquí)


// api/index.ts
const express = require('express');
const serverless = require('serverless-http');
const { createNestApp } = require('../dist/main');

const expressApp = express();

let serverlessHandler;

const setup = async () => {
  await createNestApp(expressApp);
  serverlessHandler = serverless(expressApp);
};

setup();

module.exports.handler = async (event, context) => {
  if (!serverlessHandler) {
    await setup();
  }
  return serverlessHandler(event, context);
};


