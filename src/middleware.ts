// import { NextResponse, NextRequest } from "next/server";
// import { getCurrentUser } from "aws-amplify/auth";

// // This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {
//   try {
//     const user = await getCurrentUser();
//     if (user.) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }
//     return NextResponse.next();
//   } catch (error) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
