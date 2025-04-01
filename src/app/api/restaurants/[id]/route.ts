import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const prisma = new PrismaClient();

// Get a specific restaurant
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        menuItems: true,
        reviews: true,
      },
    });

    return NextResponse.json({ data: restaurant }, { status: 200 });
  } catch (error) {
    console.error("Error finding restaurant", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Restaurant not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}

// Update a restaurant
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, address, phone } = await req.json();
    const updatedRestaurant = await prisma.restaurant.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        address,
        phone,
      },
      include: {
        menuItems: true,
        reviews: true,
      },
    });

    return NextResponse.json({ data: updatedRestaurant }, { status: 200 });
  } catch (error) {
    console.error("Error updating restaurant", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Restaurant not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}

// Delete a restaurant
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const restaurant = await prisma.restaurant.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ data: restaurant }, { status: 200 });
  } catch (error) {
    console.error("Error deleting restaurant", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Restaurant not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}
