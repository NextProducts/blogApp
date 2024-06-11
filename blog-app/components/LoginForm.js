"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function LoginForm({ getToken }) {
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
    const res = await getToken(data);
    if (res.status == 200) {
      console.log(res);
      router.push("/");
    }
    if (res.status == 401) {
      setError("password", {
        type: "custom",
        message: res.message,
      });
    }
    if (res.status == 404) {
      setError("username", {
        type: "custom",
        message: res.message,
      });
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
