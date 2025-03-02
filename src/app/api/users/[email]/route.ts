import { User } from "@/types/User";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// API to get a user by it's email.
/**
 * In Prisma .find method does not return relation fields.
 * Relation fields are those which have a relation with some other attribute.
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const user: User = await prisma.user.findUniqueOrThrow({
      where: {
        email: params.email,
      },
      include: {
        orders: true,
      },
    });

    console.log("user :", user);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("User not found!", error);
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    console.error("Internal server error", error);
    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}
