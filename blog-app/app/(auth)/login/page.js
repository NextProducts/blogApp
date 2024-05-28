"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

export default function Login() {
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  async function onSubmit(data) {
    localStorage.setItem("username", data.username);;
    const response = await axios.post("http://localhost:8000/user", data);
    router.push("/");
  }
  return (
    <article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          label={"username"}
          placeholder={"Ex: John Doe"}
          type={"text"}
        />
        <Input
          register={register}
          label={"password"}
          placeholder={"Enter your password"}
          type={"password"}
        />
        <label className="border flex justify-center bg-blue-700 text-white rounded-lg cursor-pointer py-2 mt-2 font-bold">
          <Button type={"submit"} label={"Login "} />
        </label>
      </form>
    </article>
  );
}
