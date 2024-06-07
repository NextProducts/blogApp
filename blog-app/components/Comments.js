"use client";
import { addComment } from "@/lib/features/Post/postSlice";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function Comments({ showComment, posts }) {
  const { register, handleSubmit, resetField } = useForm();
  const dispatch = useDispatch();
  const post = useSelector(({ post }) => {
    return post.posts[showComment];
  });

  const comments = post.comments;

  async function onSubmit(data) {
    const comment = {
      username: localStorage.getItem("username"),
      comment: data.comment,
    };
    resetField("comment", comment);
    const newComment = await axios.post(
      `http://localhost:7000/post/${post.post_id}/comments/new`,
      comment
    );

    dispatch(
      addComment({ postId: showComment, comment: { ...newComment.data } })
    );
  }

  return (
    <article className="flex-1">
      <h2>Comments</h2>
      <section>
        {comments.map((curr, index) => {
          return (
            <>
              <section
                key={index}
                className="border py-2 px-3 rounded-lg mb-2 bg-white"
              >
                <h3 className="font-bold">{curr.UserUsername}</h3>
                <p className="mb-2 border-b pb-2">{curr.body}</p>
                <div className=" text-white bg-blue-700  w-min py-2 px-5 rounded-xl cursor-pointer ml-auto ">
                  reply
                </div>
              </section>
            </>
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
