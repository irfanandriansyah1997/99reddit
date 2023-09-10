import { createHTTPRequest } from "@/utils/fetch-api";
import { ABOUT_JSON_API, DEFAULT_SUB_REDDIT } from "@/constant";

import { normalizerAboutAPI } from "./normalizer/normalizer-about-api";
import { DEFAULT_ABOUT_API } from "./constant";

export const fetchAboutAPI = async () => {
  const url = new URL(
    ABOUT_JSON_API.replace("{subReddit}", DEFAULT_SUB_REDDIT)
  );

  const { error, result } = await createHTTPRequest(url);

  if (error instanceof Error) {
    return {
      error: error.message,
      result: DEFAULT_ABOUT_API,
    };
  }

  return { error: undefined, result: normalizerAboutAPI(result) };
};
