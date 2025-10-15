// Em: src/server.ts

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes.js';

const app = Fastify({ logger: true });

// --- INÍCIO DO TRATAMENTO DE ERROS GLOBAL ---

app.setErrorHandler((error, request, reply) => {
  // Loga o erro completo no console do Render para vermos o que é
  app.log.error(error);

  // Envia uma resposta genérica para o frontend
  reply.status(500).send({ message: 'Ocorreu um erro interno no servidor.' });
});

// --- FIM DO TRATAMENTO DE ERROS GLOBAL ---


const start = async () => {
  // Registra o CORS primeiro
  await app.register(cors, {
    origin: "https://frontestoque.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  // Depois registra as rotas
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