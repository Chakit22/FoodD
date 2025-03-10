import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "aws-amplify/auth";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log("Inside middleware");
  const user = await getCurrentUser();
  console.log("user : ");
  console.log(user);
  if (
    request.method === "GET" ||
    request.method === "DELETE" ||
    request.method === "PATCH"
  ) {
    if (user?.role === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.json(
        { success: false, message: "Unauthorized User" },
        { status: 401 }
      );
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/users", "/api/users/:id"],
};
