// Em: src/server.ts
/*
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

start();*/

import Fastify from 'fastify';
import cors from '@fastify/cors';
// import { routes } from './routes.js'; // TEMPORARIAMENTE DESABILITADO

const app = Fastify({ logger: true });

// Tratador de erros global (mantemos por segurança)
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.status(500).send({ message: 'Ocorreu um erro interno no servidor.' });
});

const start = async () => {
  await app.register(cors, {
    origin: "https://frontestoque.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  // --- INÍCIO DA ROTA DE TESTE ---
  // Esta rota vai capturar a pré-requisição OPTIONS do navegador
  app.options('/login', async (request, reply) => {
    app.log.info(">>>>>>>>>> RECEBIDA REQUISIÇÃO OPTIONS /login <<<<<<<<<<");
    return reply.send();
  });

  // Esta rota vai capturar a requisição POST de login
  app.post('/login', async (request, reply) => {
    app.log.info(">>>>>>>>>> RECEBIDA REQUISIÇÃO POST /login <<<<<<<<<<");
    app.log.info({ body: request.body }, "Corpo da requisição:");
    return reply.status(418).send({ message: "Estou funcionando, mas sou uma rota de teste!" });
  });
  // --- FIM DA ROTA DE TESTE ---

  // await app.register(routes); // SUAS ROTAS ORIGINAIS ESTÃO DESABILITADAS

  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3333;
    await app.listen({ port: port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();