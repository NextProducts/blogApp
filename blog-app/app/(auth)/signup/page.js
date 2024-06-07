"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    mode: "onChange",
  });
  const router = useRouter();

  async function onSubmit(data) {
    try {
      localStorage.setItem("username", data.username);
      const response = await axios.post(
        "http://localhost:7000/user/signup",
        data
      );
      router.push("/login");
    } catch (err) {
      if (err.response.status) {
        console.log(err.response.data);
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
          requirements={{
            required: "Can't be empty",
          }}
        />
        <Input
          register={register}
          label={"email"}
          placeholder={"Ex: example@gmail.com"}
          type={"text"}
          errors={errors}
          requirements={{
            required: "Can't be empty",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email",
            },
          }}
        />
        <Input
          register={register}
          label={"password"}
          placeholder={"Enter your password"}
          type={"password"}
          requirements={{
            required: "Can't be empty",
            minLength: {
              value: 8,
              message: "Too Short",
            },
          }}
          errors={errors}
        />

        <Input
          register={register}
          label={"confirm password"}
          placeholder={"Enter your password again"}
          type={"password"}
          errors={errors}
          requirements={{
            required: "Can't be empty",
            validate: {
              match: (v) => {
                const password = getValues("password");
                if (password != v) return "Doesn't Match";
              },
            },
          }}
        />

        <label className="border flex justify-center bg-blue-700 text-white rounded-lg cursor-pointer py-3 mt-6 font-bold">
          <Button type={"submit"} label={"Sign Up "} />
        </label>
      </form>
    </article>
  );
}
