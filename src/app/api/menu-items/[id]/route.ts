import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const prisma = new PrismaClient();

// Get a specific menu item
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const menuItem = await prisma.menuItem.findUniqueOrThrow({
      where: {
        id: params.id,
      },
      include: {
        restaurant: true,
      },
    });

    return NextResponse.json({ data: menuItem }, { status: 200 });
  } catch (error) {
    console.error("Error finding menu item", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Menu item not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}

// Update a menu item
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, price, image, category } = await req.json();
    const updatedMenuItem = await prisma.menuItem.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        price,
        image,
        category,
      },
      include: {
        restaurant: true,
      },
    });

    return NextResponse.json({ data: updatedMenuItem }, { status: 200 });
  } catch (error) {
    console.error("Error updating menu item", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Menu item not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}

// Delete a menu item
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const menuItem = await prisma.menuItem.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ data: menuItem }, { status: 200 });
  } catch (error) {
    console.error("Error deleting menu item", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Menu item not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}
