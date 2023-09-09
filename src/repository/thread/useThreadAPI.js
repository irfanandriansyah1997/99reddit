import { createHTTPRequest } from "@/utils/fetch-api";

import { normalizerThreadAPI } from "./normalizer/normalizer-thread-api";
import { generateThreadAPIURL } from "./utils/thread-api";
import { DEFAULT_THREAD_KIND, MAX_THREAD_ITEM } from "./constant";
import { DEFAULT_THREAD_LIST } from "./constant";

export const useThreadAPI = () => {
  const handleFetchThreadAPI = async (args = {}) => {
    const {
      after = null,
      kind = DEFAULT_THREAD_KIND,
      limit = MAX_THREAD_ITEM,
    } = args;
    const url = generateThreadAPIURL({ after, kind, limit });

    const { error, result } = await createHTTPRequest(url);

    if (error instanceof Error) {
      return {
        error: error.message,
        result: DEFAULT_THREAD_LIST,
      };
    }

    return { error: undefined, result: normalizerThreadAPI(result) };
  };

  return { getThread: handleFetchThreadAPI };
};
