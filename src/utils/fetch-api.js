import { castingError } from "./error";

export const createHTTPRequest = async function (url) {
  try {
    const responseAPI = await fetch(url, {
      cache: "force-cache",
      method: "GET",
      next: { tags: ["collection"] },
    });

    if (!responseAPI.ok) {
      let customErrorMessage = `Failed api request to ${url}`;

      const responseText = await responseAPI.text();
      if (responseText) {
        customErrorMessage += responseText;
      }

      throw new Error(customErrorMessage);
    }

    return { error: undefined, result: await responseAPI.json() };
  } catch (e) {
    return {
      error: castingError(e),
      result: undefined,
    };
  }
};
