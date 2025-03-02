import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { User } from "@/types/User";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const prisma = new PrismaClient();

// Route to get all the users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Route to create a new user
export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user: User = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user", error);

    if (error instanceof PrismaClientKnownRequestError) {
      // Duplicate user
      console.error("User already exists!", error);
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "An unexpected error occured" },
      { status: 500 }
    );
  }
}
