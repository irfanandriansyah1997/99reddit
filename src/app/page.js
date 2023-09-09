import ThreadModules from "@/modules/thread";

async function getServerSideProps() {
  return { ping: "pong" };
}

const HomepageRouting = async () => {
  await getServerSideProps();

  return (
    <>
      <ThreadModules />
    </>
  );
};

export default HomepageRouting;
