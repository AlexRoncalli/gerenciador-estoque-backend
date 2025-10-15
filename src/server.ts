// Em: src/server.ts

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes.js';

const app = Fastify({ logger: true });

const start = async () => {
  // --- CONFIGURAÇÃO DE CORS CORRIGIDA ---
  // Registre o CORS como o PRIMEIRO plugin.
  // A opção 'origin: true' é a mais flexível para começar.
  await app.register(cors, { origin: true });

  // Agora registre suas rotas normalmente
  await app.register(routes);

  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3333;
    await app.listen({ port: port, host: '0.0.0.0' });
  } catch (err) {
    // Loga o erro se a inicialização do servidor falhar
    app.log.error(err);
    process.exit(1);
  }
};

start();