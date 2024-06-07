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

function LikeButton({ post, dispatch, index }) {
  return (
    <Button
      label={` ${Object.keys(post.likes).length} likes`}
      icon={
        !post.likes[localStorage.getItem("username")] ? (
          <AiOutlineLike />
        ) : (
          <AiFillLike />
        )
      }
      action={async () => {
        const res = await axios.post(
          `http://localhost:7000/post/${post.post_id}/like`,
          {
            username: localStorage.getItem("username"),
          }
        );

        dispatch(
          like({ index: index, username: localStorage.getItem("username") })
        );
      }}
    />
  );
}

function DislikeButton({ post, dispatch, index }) {
  return (
    <Button
      label={` ${Object.keys(post.dislikes).length} dislikes`}
      icon={
        !post.dislikes[localStorage.getItem("username")] ? (
          <AiOutlineDislike />
        ) : (
          <AiFillDislike />
        )
      }
      action={async () => {
        const res = await axios.post(
          `http://localhost:7000/post/${post.post_id}/dislike`,
          {
            username: localStorage.getItem("username"),
          }
        );

        dispatch(
          dislike({ index: index, username: localStorage.getItem("username") })
        );
      }}
    />
  );
}

export { LikeButton, DislikeButton };
