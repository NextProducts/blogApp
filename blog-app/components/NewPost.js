import { newPost } from "@/lib/features/Post/postSlice";

import { useForm } from "react-hook-form";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function NewPost({ setCreatePost }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    const post = {
      body: data.post,
      username: localStorage.getItem("username"),
      id: uuidv4(),
      liked: {},
      like: 0,
      dislike: 0,
      disliked: {},
      comments: [],
    };
    setCreatePost(false);
    dispatch(newPost(post));
    try {
      axios.post("http://localhost:8000/posts", post);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="fixed left-0 bottom-0 right-0 top-0 bg-transparent ">
      <form
        className="p-4 bg-white fixed top-[50%] w-[600px] left-[50%] translate-x-[-50%]  translate-y-[-50%] border rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          {...register("post")}
          placeholder="write your blog "
          className="outline-none w-full h-[300px]"
        />

        <section className="flex justify-end">
          <div className="border px-3 py-2 rounded-lg">
            <Button type={"submit"} label={"Create Post"} />
          </div>
        </section>
      </form>
    </div>
  );
}
