import {
  DEFAULT_THREAD_LIST,
  THREAD_VOTE_KIND,
} from "@/repository/thread/constant";

import { normalizerThreadItem } from "@/utils/normalizer";

export const normalizerThreadAPI = (response) => {
  try {
    if (!response || !response.data) throw new Error();

    const {
      data: { after, children },
    } = response;

    let isHasAvailableNextPage = DEFAULT_THREAD_LIST.hasAvailableNextPage;
    let threadId = {};
    let threadList = [];

    if (typeof after === "string" && after) {
      isHasAvailableNextPage = {
        state: true,
        threadId: after,
      };
    }

    if (typeof children === "object" && Array.isArray(children)) {
      const result = children.reduce(
        (result, currentChildren) => {
          const isThreadItemIsAvailable =
            typeof currentChildren === "object" &&
            currentChildren &&
            typeof currentChildren.data === "object" &&
            currentChildren.data;

          if (isThreadItemIsAvailable) {
            const {
              data: { id },
            } = currentChildren;
            const isIdAvailable = typeof id === "string" && id;
            const formattedThreadItem = normalizerThreadItem(
              currentChildren.data
            );

            if (formattedThreadItem && isIdAvailable) {
              result.threadId = {
                ...result.threadId,
                [id]: { visited: false, vote: THREAD_VOTE_KIND.none },
              };
              result.threadList.push(formattedThreadItem);
            }
          }

          return result;
        },
        { threadId, threadList }
      );

      threadId = result.threadId;
      threadList = result.threadList;
    }

    return {
      hasAvailableNextPage: isHasAvailableNextPage,
      threadId,
      threadList,
    };
  } catch (e) {
    return DEFAULT_THREAD_LIST;
  }
};
