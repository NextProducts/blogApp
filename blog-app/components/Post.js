import { FaRegCommentAlt } from "react-icons/fa";

import { DislikeButton, LikeButton } from "./Button";
import { useDispatch } from "react-redux";
import Carousel from "./Carousel";

export default function Post({ post, setShowComment, index }) {
  const dispatch = useDispatch();
  let commentLength = 0;
  commentLength += post.comments.length;

  for (let x of post.comments) {
    commentLength += x.nestedComment.length;
  }
  return (
    <section className="w-[600px] border p-4 rounded-lg bg-white mb-4">
      <h2 className="font-bold text-lg">{post.UserUsername}</h2>
      <p className="py-3">{post.content}</p>

      {post.images.length != 0 && <Carousel images={post.images} />}

      <div className="flex border-t pt-7 pb-3 justify-center">
        <span className="mr-12">
          <LikeButton post={post} dispatch={dispatch} index={index} />
        </span>
        <span className="mr-12">
          <DislikeButton post={post} dispatch={dispatch} index={index} />
        </span>
        <p
          className="flex items-center cursor-pointer"
          onClick={() => {
            setShowComment(index);
          }}
        >
          <FaRegCommentAlt />
          <span className="ml-2 ">{commentLength} comments</span>
        </p>
      </div>
    </section>
  );
}
