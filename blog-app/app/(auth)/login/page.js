"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

export default function Login() {
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
      console.log(res);
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
        <label className="border flex justify-center bg-blue-700 text-white rounded-lg cursor-pointer py-2 mt-2 font-bold">
          <Button type={"submit"} label={"Login "} />
        </label>
      </form>
    </article>
  );
}
