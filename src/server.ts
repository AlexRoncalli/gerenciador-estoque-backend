import Fastify from 'fastify';
import cors from '@fastify/cors';
// import { routes } from './routes.js'; // LINHA COMENTADA

const app = Fastify({ logger: true });

const start = async () => {
  // await app.register(routes); // LINHA COMENTADA
  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // ROTA DE TESTE ADICIONADA
  app.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });

  try {
    const port = process.env.PORT ? Number(process.env.PORT) : 3333;
    await app.listen({ port: port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();