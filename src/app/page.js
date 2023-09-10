import { notFound } from "next/navigation";

import ThreadListModules from "@/modules/thread-list";
import { DEFAULT_THREAD_KIND } from "@/repository/thread/constant";
import { fetchThreadAPI } from "@/repository/thread/fetch-thread-api";

const HomepageRouting = async () => {
  const { error, result } = await fetchThreadAPI({ kind: DEFAULT_THREAD_KIND });

  if (error || typeof result === "undefined") return notFound();

  return (
    <ThreadListModules
      hasAvailableNextPage={result.hasAvailableNextPage}
      threadId={result.threadId}
      threadList={result.threadList}
    />
  );
};

export default HomepageRouting;
