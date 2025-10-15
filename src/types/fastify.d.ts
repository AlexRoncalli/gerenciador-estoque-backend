import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    user_id: string;
    user_role: string;
  }
}