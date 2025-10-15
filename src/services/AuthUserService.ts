import { prisma } from "../prisma/index.js";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

interface AuthUserProps {
  name: string;
  password: string;
}

class AuthUserService {
  async execute({ name, password }: AuthUserProps) {
    // 1. Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    if (!user) {
      throw new Error("Usuário ou senha incorretos.");
    }

    // 2. Verificar se a senha está correta
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Usuário ou senha incorretos.");
    }

    // 3. Gerar o token JWT
    const token = jwt.sign(
      {
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET as string, // Chave secreta para assinar o token
      {
        subject: user.id, // O ID do usuário é o "sujeito" do token
        expiresIn: "1d", // O token expira em 1 dia
      }
    );

    return { token };
  }
}

export { AuthUserService };