export default function NestedComment({ curr, parent, setReply }) {
  return (
    <section className="ml-10 my-4 bg-white py-2 px-5 rounded-lg">
      <h3 className="font-bold text-lg">{curr.UserUsername}</h3>
      <p className="mb-2">{curr.body}</p>
      <div
        className=" cursor-pointer ml-2 rounded-lg w-min font-bold"
        onClick={() => {
          setReply({
            root: true,
            to: curr.UserUsername,
            parent: parent.comment_id,
          });
        }}
      >
        reply
      </div>
    </section>
  );
}
