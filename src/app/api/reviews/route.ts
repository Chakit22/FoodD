import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const prisma = new PrismaClient();

// Get all reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
        restaurant: true,
      },
    });
    return NextResponse.json({ data: reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create a new review
export async function POST(req: NextRequest) {
  try {
    const { userId, restaurantId, rating, comment } = await req.json();

    if (!userId || !restaurantId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId,
        restaurantId,
        rating,
        comment,
      },
      include: {
        user: true,
        restaurant: true,
      },
    });

    return NextResponse.json({ data: review }, { status: 201 });
  } catch (error) {
    console.error("Error creating review", error);

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
