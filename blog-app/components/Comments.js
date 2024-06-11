"use client";
import { addComment, newReply } from "@/lib/features/Post/postSlice";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { useState } from "react";

import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";

export default function Comments({ showComment, setShowComment }) {
  const { register, handleSubmit, resetField } = useForm();
  const dispatch = useDispatch();

  const [reply, setReply] = useState(null);

  const post = useSelector(({ post }) => {
    return post.posts[showComment];
  });

  const comments = post.comments;
  async function onSubmit(data) {
    let comment = {
      username: localStorage.getItem("username"),
      comment: data.comment,
    };
    resetField("comment", comment);
    if (reply == null) {
      const newComment = await axios.post(
        `http://localhost:7000/post/${post.post_id}/comments/new`,
        comment
      );
      dispatch(
        addComment({ postId: showComment, comment: { ...newComment.data } })
      );
    } else {
      comment = {
        ...comment,
        ...reply,
      };
      const replyComment = await axios.post(
        `http://localhost:7000/post/${post.post_id}/comments/reply`,
        comment
      );
      dispatch(
        newReply({ postId: showComment, comment: { ...replyComment.data } })
      );
    }
  }

  return (
    <article className="flex-1  ml-10 relative h-[96vh] overflow-y-auto">
      <section className="flex justify-between items-center">
        <h2 className=" text-3xl font-bold mb-5">Comments</h2>{" "}
        <span
          className="cursor-pointer"
          onClick={() => {
            setShowComment(null);
          }}
        >
          <IconContext.Provider value={{ size: 30 }}>
            <IoMdClose />
          </IconContext.Provider>
        </span>
      </section>
      <section>
        {comments.map((curr, index) => {
          return (
            <>
              <Comment curr={curr} index={index} setReply={setReply} />
            </>
          );
        })}
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex px-4 border rounded-lg bg-white mt-2 items-center absolute bottom-0 left-0 w-full"
      >
        {reply && (
          <div className="border flex items-center px-2 py-1 rounded-lg mr-2">
            {reply.to}{" "}
            <span
              className="ml-2 cursor-pointer"
              onClick={() => {
                setReply(null);
              }}
            >
              <IconContext.Provider value={{ size: 20 }}>
                <IoMdClose />
              </IconContext.Provider>
            </span>
          </div>
        )}
        <input
          type="text"
          placeholder="add a comment"
          {...register("comment")}
          className="flex-1 p-2 outline-none"
        />
        <button className="ml-2">send</button>
      </form>
    </article>
  );
}
