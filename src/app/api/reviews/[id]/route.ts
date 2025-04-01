import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const prisma = new PrismaClient();

// Get a specific review
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const review = await prisma.review.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        restaurant: true,
      },
    });

    return NextResponse.json({ data: review }, { status: 200 });
  } catch (error) {
    console.error("Error finding review", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: "Review not found!" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}

// Update a review
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { rating, comment } = await req.json();

    if (!rating) {
      return NextResponse.json(
        { error: "Rating is required" },
        { status: 400 }
      );
    }

    const updatedReview = await prisma.review.update({
      where: {
        id: params.id,
      },
      data: {
        rating,
        comment,
      },
      include: {
        user: true,
        restaurant: true,
      },
    });

    return NextResponse.json({ data: updatedReview }, { status: 200 });
  } catch (error) {
    console.error("Error updating review", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: "Review not found!" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}

// Delete a review
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const review = await prisma.review.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ data: review }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: "Review not found!" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}
