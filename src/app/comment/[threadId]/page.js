async function getServerSideProps() {
  return { ping: "pong" };
}

const CommentRouting = async () => {
  await getServerSideProps();

  return <div>Comment Routing</div>;
};

export default CommentRouting;
