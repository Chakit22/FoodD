import { User } from "@/types/User";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// API to get a user by it's id.
/**
 * In Prisma .find method does not return relation fields.
 * Relation fields are those which have a relation with some other attribute.
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user: User = await prisma.user.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        orders: true,
      },
    });

    console.log("user :", user);
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.error("Error finding user", error);
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

// API to update user details
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, password, role } = await req.json();
    const updatedUser: User = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        email,
        password,
        role,
      },
    });

    console.log("updated User");
    console.log(updatedUser);
    return NextResponse.json({ data: updatedUser }, { status: 201 });
  } catch (error) {
    console.error("Error updating user details", error);
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

// API to delete a user (Admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Also deletes the corresponding orders as well
    const user: User = await prisma.user.delete({
      where: {
        id: params.id,
      },
    });

    console.log("User deleted sucessfully!");
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user", error);
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
