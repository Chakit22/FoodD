import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const prisma = new PrismaClient();

// Get all restaurants
export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        menuItems: true,
        reviews: true,
      },
    });
    return NextResponse.json({ data: restaurants }, { status: 200 });
  } catch (error) {
    console.error("Error fetching restaurants", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create a new restaurant
export async function POST(req: NextRequest) {
  try {
    const { name, description, address, phone, ownerId } = await req.json();

    if (!name || !description || !address || !phone || !ownerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        description,
        address,
        phone,
        ownerId,
      },
      include: {
        menuItems: true,
        reviews: true,
      },
    });

    return NextResponse.json({ data: restaurant }, { status: 201 });
  } catch (error) {
    console.error("Error creating restaurant", error);

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
