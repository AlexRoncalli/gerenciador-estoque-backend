// Em: src/server.ts

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes.js';

const app = Fastify({ logger: true });

const start = async () => {
  // --- CONFIGURAÇÃO DE CORS CORRIGIDA ---
  // Registre o CORS como o PRIMEIRO plugin.
  // A opção 'origin: true' é a mais flexível para começar.
  await app.register(cors, {
    // ‼️ MUITO IMPORTANTE: Coloque a URL exata do seu frontend
    origin: 'https://estoquefront.netlify.app',
    
    // Métodos HTTP que seu frontend pode usar
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

    // Headers que seu frontend pode enviar (Authorization é essencial para o token JWT)
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Agora registre suas rotas normalmente
  await app.register(routes);

  try {
    // Para deploy no Render, é importante usar host: '0.0.0.0'
    await app.listen({
      port: process.env.PORT ? Number(process.env.PORT) : 3333,
      host: '0.0.0.0'
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();