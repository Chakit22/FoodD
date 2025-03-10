import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Order } from "@/types/Order";
import { getCurrentUser } from "aws-amplify/auth";

const prisma = new PrismaClient();

// API to create an order
export async function POST(req: Request) {
  try {
    const { userId, foodItem, price } = await req.json();

    if (!userId || !foodItem || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: { userId, foodItem, price, status: "Ordered" },
    });
    return NextResponse.json({ data: order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order", error);

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

// API to get all the orders (of all the users) (For Admin)
export async function GET() {
  try {
    const { signInDetails } = await getCurrentUser();
    console.log(signInDetails);
    const orders: Order[] = await prisma.order.findMany();
    console.log("orders : ");
    console.log(orders);
    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all orders", error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Error fetching orders" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occured" },
      { status: 500 }
    );
  }
}
