import { createHTTPRequest } from "@/utils/fetch-api";
import { COMMENT_JSON_API, DEFAULT_SUB_REDDIT } from "@/constant";

import { normalizerCommentAPI } from "./normalizer/normalizer-comment-api";

export const fetchCommentAPI = async (args = {}) => {
  const { threadId } = args;
  const url = new URL(
    COMMENT_JSON_API.replace("{subReddit}", DEFAULT_SUB_REDDIT).replace(
      "{threadId}",
      threadId
    )
  );

  const { error, result } = await createHTTPRequest(url);

  if (error instanceof Error) {
    return {
      error: error.message,
      result: undefined,
    };
  }

  return { error: undefined, result: normalizerCommentAPI(result) };
};
