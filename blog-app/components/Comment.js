import NestedComment from "./NestedComment";

export default function Comment({ curr, index, setReply }) {
  return (
    <article>
      <section
        key={index}
        className="border py-3 px-5 rounded-lg mb-2 bg-white"
      >
        <h3 className="font-bold text-lg">{curr.UserUsername}</h3>
        <p className="mb-2">{curr.body}</p>
        <div
          className=" cursor-pointer ml-2 rounded-lg w-min font-bold"
          onClick={() => {
            setReply({
              root: null,
              to: curr.UserUsername,
              parent: curr.comment_id,
            });
          }}
        >
          reply
        </div>
      </section>
      {curr.nestedComment.map((child) => (
        <NestedComment curr={child} setReply={setReply} parent={curr} />
      ))}
    </article>
  );
}
