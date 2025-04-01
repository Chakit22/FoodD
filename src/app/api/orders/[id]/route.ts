import { Order } from "@/types/Order";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// API to get the order details of a specific order
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.orders.findUniqueOrThrow({
      where: {
        id: params.id,
      },
    });

    console.log("order :", order);
    return NextResponse.json({ data: order }, { status: 200 });
  } catch (error) {
    console.error("Error finding order details", error);
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Order not found!", error);
      return NextResponse.json({ error: "Order not found!" }, { status: 404 });
    }

    console.error("Internal server error", error);
    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}

// API to update order details
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { price, status } = await req.json();
    const updatedOrder = await prisma.orders.update({
      where: {
        id: params.id,
      },
      data: {
        price,
        status,
        orderItems: {
          create: {
            foodItemId: "food123",
            quantity: 2,
          },
        },
      },
    });

    console.log("updated Order:");
    console.log(updatedOrder);
    return NextResponse.json({ data: updatedOrder }, { status: 201 });
  } catch (error) {
    console.error("Error updating Order details", error);
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Order not found!", error);
      return NextResponse.json({ error: "Order not found!" }, { status: 404 });
    }

    console.error("Internal server error", error);
    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}

// API to delete a order (Admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Also deletes the corresponding orders as well
    const order = await prisma.orders.delete({
      where: {
        id: params.id,
      },
    });

    console.log("Order deleted sucessfully!");
    return NextResponse.json({ data: order }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Order", error);
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Order not found!", error);
      return NextResponse.json({ error: "Order not found!" }, { status: 404 });
    }

    console.error("Internal server error", error);
    return NextResponse.json(
      { error: "Internal Server error!" },
      { status: 500 }
    );
  }
}
