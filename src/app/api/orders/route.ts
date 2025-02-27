import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, foodItem, price } = await req.json();
  const order = await prisma.order.create({
    data: { userId, foodItem, price, status: "Pending" },
  });
  return NextResponse.json(order);
}
