import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export default function middlewares(request) {
  const token = cookies().get("token");
  if (token) {
    const decode = jwt.decode(token.value, process.env.TOKEN_SECRET);
    if (Date.now() > decode.exp * 1000 && request.nextUrl.pathname == "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      if (
        !(Date.now() > decode.exp * 1000) &&
        (request.nextUrl.pathname == "/login" ||
          request.nextUrl.pathname == "/signup")
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname == "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
