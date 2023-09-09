import ThreadModules from "@/modules/thread";

async function getServerSideProps() {
  return { ping: "pong" };
}

const ThreadRouting = async () => {
  await getServerSideProps();

  return <ThreadModules />;
};

export default ThreadRouting;
