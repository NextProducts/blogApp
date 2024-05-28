import { dislike, like } from "@/lib/features/Post/postSlice";
import axios from "axios";
import { IconContext } from "react-icons";

import {
  AiFillLike,
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";

export default function Button({ type, action, label, icon }) {
  return (
    <IconContext.Provider value={{ size: 20 }}>
      <button type={type} onClick={action} className="flex">
        {icon}
        <span className="ml-2">{label}</span>
      </button>
    </IconContext.Provider>
  );
}

function LikeButton({ post_id, post, dispatch, index }) {
  axios.patch(`http://localhost:8000/posts/${post_id}`, {
    liked: { ...post.liked },
    like: post.like,
  });
  return (
    <Button
      label={` ${post.like} likes`}
      icon={
        !post.liked[localStorage.getItem("username")] ? (
          <AiOutlineLike />
        ) : (
          <AiFillLike />
        )
      }
      action={() => {
        dispatch(
          like({ index: index, user: localStorage.getItem("username") })
        );
      }}
    />
  );
}

function DislikeButton({ post_id, post, dispatch, index }) {
  axios.patch(`http://localhost:8000/posts/${post_id}`, {
    disliked: { ...post.disliked },
    dislike: post.dislike,
  });
  return (
    <Button
      label={` ${post.dislike} dislikes`}
      icon={
        !post.disliked[localStorage.getItem("username")] ? (
          <AiOutlineDislike />
        ) : (
          <AiFillDislike />
        )
      }
      action={() => {
        dispatch(
          dislike({ index: index, user: localStorage.getItem("username") })
        );
      }}
    />
  );
}

export { LikeButton, DislikeButton };
