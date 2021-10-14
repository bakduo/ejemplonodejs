'use strict'

const config = require('../src/config/index');
const app = require('../src/server');
const { port } = config.server;
app.listen(port);