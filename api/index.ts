// api/index.ts (o js si no usás TS directamente aquí)


// api/index.ts
const express = require('express');
const serverless = require('serverless-http');
const { createNestApp } = require('../dist/main');

const expressApp = express();

createNestApp(expressApp).then(() => {
  module.exports.handler = serverless(expressApp);
});

