"use client";
import Post from "@/components/Post";

import { useEffect, useState } from "react";
import Comments from "@/components/Comments";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "@/lib/features/Post/postSlice";
import Button from "@/components/Button";
import NewPost from "@/components/NewPost";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const posts = useSelector(({ post }) => post.posts);
  useEffect(() => {
    dispatch(fetchPost());
  }, []);

  const [showComment, setShowComment] = useState(null);
  const [createPost, setCreatePost] = useState(false);

  return (
    <main className="flex ">
      <article className="flex-1 flex flex-col items-center px-4">
        {posts.map((curr, index) => {
          return (
            <Post
              post={curr}
              index={index}
              key={curr.post_id}
              setShowComment={setShowComment}
            />
          );
        })}
        <label className="flex justify-center w-[600px] border py-4 bg-blue-700 text-white font-bold rounded-lg cursor-pointer">
          <Button
            type={"button"}
            label={"Create New Post"}
            action={() => {
              setCreatePost(true);
            }}
          />
        </label>
      </article>
      {showComment != null && (
        <Comments showComment={showComment} setShowComment={setShowComment} />
      )}

      {createPost && <NewPost setCreatePost={setCreatePost} />}
    </main>
  );
}
