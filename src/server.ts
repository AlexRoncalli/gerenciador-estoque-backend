// em src/server.ts

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes.js';

const app = Fastify({ logger: true });

const start = async () => {
  // 1. REGISTRE O CORS PRIMEIRO!
  await app.register(cors);

  // 2. DEPOIS REGISTRE AS ROTAS
  await app.register(routes);

  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3333;
    await app.listen({ port: port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();