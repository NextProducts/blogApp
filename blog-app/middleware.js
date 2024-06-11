import jwt from "jsonwebtoken";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
export default function middlewares(request) {
    
  const token = cookies().getAll();
  console.log(token);
}
