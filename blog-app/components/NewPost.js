import { newPost } from "@/lib/features/Post/postSlice";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRef, useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageInsert from "./ImageInsert";

export default function NewPost({ setCreatePost }) {
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState([]);

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("body", data.post);
    formData.append("username", localStorage.getItem("username"));
    files.forEach((file) => {
      formData.append("images", file[2]);
    });
    setCreatePost(false);

    try {
      const res = await axios.post("http://localhost:7000/post/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      dispatch(newPost(res.data.post));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div
        className="fixed left-0 bottom-0 right-0 top-0 bg-transparent "
        onClick={() => {
          setCreatePost(false);
        }}
      ></div>
      <form
        className="p-4 bg-white fixed top-[50%] w-[620px] left-[50%] translate-x-[-50%]  translate-y-[-50%] border rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          {...register("post")}
          placeholder="write your blog "
          className="outline-none w-full min-h-[200px] resize-none"
        />

        <ImagePreview files={files} setFiles={setFiles} fileRef={fileRef} />

        <section className="flex justify-between border-t pt-3 ">
          <ImageInsert
            files={files}
            setFiles={setFiles}
            register={register}
            ref={fileRef}
          />

          <div className="border px-3 py-2 rounded-lg">
            <Button type={"submit"} label={"Create Post"} />
          </div>
        </section>
      </form>
    </>
  );
}
