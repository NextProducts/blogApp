"use client";
import { addComment } from "@/lib/features/Post/postSlice";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function Comments({ showComment, posts }) {
  const { register, handleSubmit, resetField } = useForm();
  const dispatch = useDispatch();

  const index = posts.findIndex((curr) => curr.id == showComment);
  const comments = posts[index].comments;

  function onSubmit(data) {
    const comment = {
      username: localStorage.getItem("username"),
      comment: data.comment,
    };
    resetField("comment", comment);
    axios.patch(`http://localhost:8000/posts/${showComment}`, {
      comments: [...comments, comment],
    });
    dispatch(addComment({ postId: index, ...comment }));
  }

  return (
    <article className="flex-1">
      <h2>Comments</h2>
      <section>
        {comments.map((curr, index) => {
          return (
            <div
              key={index}
              className="border py-2 px-3 rounded-lg mb-2 bg-white"
            >
              <h3 className="font-bold">{curr.username}</h3>
              <p>{curr.comment}</p>
            </div>
          );
        })}
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex px-4 border rounded-lg bg-white"
      >
        <input
          type="text"
          placeholder="Add something"
          {...register("comment")}
          className="flex-1 p-2 outline-none"
        />
        <button className="ml-2">send</button>
      </form>
    </article>
  );
}
