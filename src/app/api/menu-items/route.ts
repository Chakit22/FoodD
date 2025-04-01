import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const prisma = new PrismaClient();

// Get all menu items
export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        restaurant: true,
      },
    });
    return NextResponse.json({ data: menuItems }, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu items", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create a new menu item
export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      restaurantId,
    } = await req.json();

    if (!name || !description || !price || !category || !restaurantId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        image,
        category,
        restaurantId,
      },
      include: {
        restaurant: true,
      },
    });

    return NextResponse.json({ data: menuItem }, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item", error);

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
