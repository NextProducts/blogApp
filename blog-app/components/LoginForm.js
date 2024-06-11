"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onChange",
  });

  const router = useRouter();
  async function onSubmit(data) {
    try {
      const res = await axios.post("http://localhost:7000/user/login", data);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token", res.data);
      router.push("/");
    } catch (err) {
      if (err.response.status == 401) {
        setError("password", {
          type: "custom",
          message: err.response.data.message,
        });
      }

      if (err.response.status == 404) {
        setError("username", {
          type: "custom",
          message: err.response.data.message,
        });
      }
    }
  }
  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          label={"username"}
          placeholder={"Ex: John Doe"}
          type={"text"}
          errors={errors}
        />
        <Input
          register={register}
          label={"password"}
          placeholder={"Enter your password"}
          type={"password"}
          errors={errors}
          requirements={{
            minLength: {
              value: 8,
              message: "Too short",
            },
          }}
        />

        <p className="mt-10 mb-3">
          Don't have an account?{" "}
          <span className=" text-blue-700 font-semibold">
            <Link href={"/signup"}>Register Now</Link>{" "}
          </span>
        </p>
        <label className="border flex justify-center bg-blue-700 text-white rounded-lg cursor-pointer py-3 font-bold">
          <Button type={"submit"} label={"Login "} />
        </label>
      </form>
    </article>
  );
}
