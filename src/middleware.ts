import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return (
          session.tokens?.accessToken !== undefined &&
          session.tokens?.idToken !== undefined
        );
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  console.log(authenticated);

  if (!authenticated) {
    return NextResponse.redirect(
      new URL("/auth/signin", request.nextUrl.origin)
    );
  }

  // User is authenticated
  if (request.method !== "POST") {
    // Check if the user role is admin if not then do not allow
    if (request.headers.get("user-role") == "admin") {
      return response;
    } else {
      return NextResponse.json(
        {
          error: "Access forbidden",
        },
        {
          status: 403,
        }
      );
    }
  }

  console.log("hey");

  return response;
}

export const config = {
  matcher: ["/api/users", "/api/users/:id"],
};
