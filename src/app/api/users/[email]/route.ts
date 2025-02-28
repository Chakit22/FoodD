import { User } from "@/types/User";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const user: User = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
    });
  } catch (error) {}
}
