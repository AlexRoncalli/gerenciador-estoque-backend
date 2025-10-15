import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";

// --- IMPORTS DOS CONTROLLERS ---

// Controladores de Produto
import { CreateProductController } from "./controllers/CreateProductController.js";
import { ListProductsController } from "./controllers/ListProductsController.js";
import { DeleteProductController } from "./controllers/DeleteProductController.js";
import { UpdateProductController } from "./controllers/UpdateProductController.js";

// Controladores de Usuário e Autenticação
import { CreateUserController } from "./controllers/CreateUserController.js";
import { AuthUserController } from "./controllers/AuthUserController.js";
import { isAdmin } from "./middlewares/isAdmin.js"; // <-- IMPORTE O NOVO MIDDLEWARE
import { AdminCreateUserController } from "./controllers/AdminCreateUserController.js"; // <-- IMPORTE O NOVO CONTROLLER
import { RequestDeletionController } from "./controllers/RequestDeletionController.js"; // <-- IMPORTE O NOVO CONTROLLER
import { ListDeletionRequestsController } from "./controllers/ListDeletionRequestsController.js"; //ADM
import { ApproveDeletionRequestController } from "./controllers/ApproveDeletionRequestController.js";//ADM
import { RejectDeletionRequestController } from "./controllers/RejectDeletionRequestController.js";//ADM

//  CONTROLADORES DE LOCALIZAÇÃO
import { ListLocationsController } from "./controllers/ListLocationsController.js";
import { CreateLocationController } from "./controllers/CreateLocationController.js";
import { UpdateLocationController } from "./controllers/UpdateLocationController.js";
import { DeleteLocationController } from "./controllers/DeleteLocationController.js";
import { MoveLocationController } from "./controllers/MoveLocationController.js"; // <-- IMPORTE


//  CONTROLADORES DE SAÍDA
import { ListExitsController } from "./controllers/ListExitsController.js";
import { CreateExitController } from "./controllers/CreateExitController.js";
import { UpdateExitObservationController } from "./controllers/UpdateExitObservationController.js"; // <-- IMPORTE


//Controladores de MasterLocations
import { ListMasterLocationsController } from "./controllers/ListMasterLocationController.js";
import { CreateMasterLocationController } from "./controllers/CreateMasterLocationController.js";
import { DeleteMasterLocationController } from "./controllers/DeleteMasterLocationController.js";
import { CountDeletionRequestsController } from "./controllers/CountDeletionRequestsController.js"; // <-- IMPORTE


// IMPORTE OS NOVOS CONTROLADORES DE USUÁRIO
import { ListUsersController } from "./controllers/ListUsersController.js";
import { UpdateUserController } from "./controllers/UpdateUserController.js";
import { DeleteUserController } from "./controllers/DeleteUserController.js";


// IMPORTE O NOVO CONTROLADOR DE LOGS
import { ListAuditLogsController } from "./controllers/ListAuditLogsController.js";




export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  // --- ROTAS DE PRODUTO ---
  fastify.post("/product", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateProductController().handle(request, reply);
  });

  fastify.get("/products", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListProductsController().handle(request, reply);
  });

  fastify.delete(
    "/product/:sku",
    { preHandler: [isAuthenticated, isAdmin] }, // agora só deleta se for adm
    async (request, reply) => {
      return new DeleteProductController().handle(request, reply);
    }
  );

  fastify.put("/product/:sku", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new UpdateProductController().handle(request, reply);
  });

  // Rota para um usuário solicitar a exclusão de um produto
  fastify.post(
    "/product/request-deletion/:sku",
    { preHandler: [isAuthenticated] }, // <-- Só precisa estar logado
    async (request, reply) => {
      return new RequestDeletionController().handle(request, reply);
    }
  );

  // --- ROTAS EXCLUSIVAS DE ADMIN ---
  fastify.post(
    "/admin/user",
    { preHandler: [isAuthenticated, isAdmin] }, // <-- USA OS DOIS MIDDLEWARES
    async (request, reply) => {
      return new AdminCreateUserController().handle(request, reply);
    }
  );

  // Listar solicitações de exclusão pendentes
  fastify.get(
    "/admin/deletion-requests",
    { preHandler: [isAuthenticated, isAdmin] },
    async (request, reply) => {
      return new ListDeletionRequestsController().handle(request, reply);
    }
  );

  // Aprovar uma solicitação
  fastify.post(
    "/admin/deletion-requests/:requestId/approve",
    { preHandler: [isAuthenticated, isAdmin] },
    async (request, reply) => {
      return new ApproveDeletionRequestController().handle(request, reply);
    }
  );

  // Rejeitar uma solicitação
  fastify.post(
    "/admin/deletion-requests/:requestId/reject",
    { preHandler: [isAuthenticated, isAdmin] },
    async (request, reply) => {
      return new RejectDeletionRequestController().handle(request, reply);
    }
  );

  // --- Rotas Públicas ---
  fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(request, reply);
  });

  // Listar todos os usuários
  fastify.get(
    "/admin/users",
    { preHandler: [isAuthenticated, isAdmin] },
    async (request, reply) => {
      return new ListUsersController().handle(request, reply);
    }
  );

  // Atualizar a role de um usuário
  fastify.put(
    "/admin/user/:id",
    { preHandler: [isAuthenticated, isAdmin] },
    async (request, reply) => {
      return new UpdateUserController().handle(request, reply);
    }
  );

  // Deletar um usuário
  fastify.delete(
    "/admin/user/:id",
    { preHandler: [isAuthenticated, isAdmin] },
    async (request, reply) => {
      return new DeleteUserController().handle(request, reply);
    }
  );

  // ROTA DE LOGIN
  fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    return new AuthUserController().handle(request, reply);
  });

  // --- ROTAS DE LOCALIZAÇÃO ---
  fastify.get("/locations", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new ListLocationsController().handle(request, reply);
  });

  fastify.post("/location", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new CreateLocationController().handle(request, reply);
  });

  fastify.put("/location/:id", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new UpdateLocationController().handle(request, reply);
  });

  fastify.delete("/location/:id", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new DeleteLocationController().handle(request, reply);
  });

  // --- ROTAS DE SAÍDA DE PRODUTO ---
  fastify.get("/exits", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new ListExitsController().handle(request, reply);
  });

  fastify.post("/exit", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new CreateExitController().handle(request, reply);
  });

  // --- ROTAS DA LISTA MESTRA DE LOCALIZAÇÕES ---
  fastify.get("/master-locations", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new ListMasterLocationsController().handle(request, reply);
  });

  fastify.post("/master-location", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new CreateMasterLocationController().handle(request, reply);
  });

  // Usamos o nome como parâmetro na URL para a exclusão
  fastify.delete("/master-location/:name", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new DeleteMasterLocationController().handle(request, reply);
  });

  // Rota para buscar o log de auditoria
  fastify.get(
    "/admin/audit-logs",
    { preHandler: [isAuthenticated, isAdmin] },
    async (request, reply) => {
      return new ListAuditLogsController().handle(request, reply);
    }
  );

  fastify.get(
    "/admin/deletion-requests/count",
    { preHandler: [isAuthenticated, isAdmin] },
    async (request, reply) => {
      return new CountDeletionRequestsController().handle(request, reply);
    }
  );

  // Rota para atualizar a observação de uma saída
  fastify.put(
    "/exit/:id/observation",
    { preHandler: [isAuthenticated] },
    async (request, reply) => {
      return new UpdateExitObservationController().handle(request, reply);
    }
  );

  // Rota para movimentar estoque
  fastify.post("/locations/move", { preHandler: [isAuthenticated] }, async (request, reply) => {
    return new MoveLocationController().handle(request, reply);
  });


}