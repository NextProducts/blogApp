import LoginForm from "@/components/LoginForm";
import axios from "axios";
import { cookies } from "next/headers";

export default function LoginPage() {
  async function getToken(data) {
    "use server";
    try {
      const res = await axios.post("http://localhost:7000/user/login", data);
      cookies().set("token", res.data.token);
      return { status: 200 };
    } catch (err) {
      if (err.response.status == 401) {
        return { status: 401, message: err.response.data.message };
      }
      if (err.response.status == 404) {
        return { status: 404, message: err.response.data.message };
      }
    }
  }
  return <LoginForm getToken={getToken} />;
}
