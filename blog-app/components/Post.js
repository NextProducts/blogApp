import { FaRegCommentAlt } from "react-icons/fa";

import { DislikeButton, LikeButton } from "./Button";
import { useDispatch } from "react-redux";

export default function Post({ posts, post, post_id, setShowComment }) {
  const dispatch = useDispatch();

  const index = posts.findIndex((post) => post["id"] == post_id);
  console.log(index);
  return (
    <section className="w-[600px] border p-4 rounded-lg bg-white mb-4">
      <h2 className="font-bold text-lg">{post.username}</h2>
      <p className="py-3">{post.body}</p>
      <div className="flex border-t p-3">
        <span className="mr-4">
          <LikeButton
            post_id={post_id}
            index={index}
            post={post}
            dispatch={dispatch}
          />
        </span>
        <span className="mr-4">
          <DislikeButton
            post_id={post_id}
            index={index}
            post={post}
            dispatch={dispatch}
          />
        </span>
        <p
          className="flex items-center cursor-pointer"
          onClick={() => {
            setShowComment(post_id);
          }}
        >
          <FaRegCommentAlt />
          <span className="ml-2 ">
            {post ? post.comments.length : 0} comments
          </span>
        </p>
      </div>
    </section>
  );
}
