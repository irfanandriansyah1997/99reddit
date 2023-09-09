import {
  DEFAULT_THREAD_KIND,
  MAX_THREAD_ITEM,
  THREAD_KIND,
} from "@/repository/thread/constant";

import {
  DEFAULT_SUB_REDDIT,
  THREAD_HOT_JSON_API,
  THREAD_NEW_JSON_API,
  THREAD_TOP_JSON_API,
} from "@/constant";

export const generateThreadAPIURL = (args) => {
  const {
    after = null,
    kind = DEFAULT_THREAD_KIND,
    limit = MAX_THREAD_ITEM,
  } = args;
  let url = THREAD_HOT_JSON_API;

  switch (kind) {
    case THREAD_KIND.new:
      url = THREAD_NEW_JSON_API;
      break;

    case THREAD_KIND.top:
      url = THREAD_TOP_JSON_API;
      break;

    case THREAD_KIND.hot:
    default:
      url = THREAD_HOT_JSON_API;
      break;
  }

  let formattedUrl = new URL(url.replace("{subReddit}", DEFAULT_SUB_REDDIT));

  if (Boolean(after)) formattedUrl.searchParams.set("after", after);
  if (limit) formattedUrl.searchParams.set("limit", limit);

  return formattedUrl.toString();
};
