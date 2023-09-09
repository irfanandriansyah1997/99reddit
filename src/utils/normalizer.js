import { createUniqueId } from "./uuid";

export const normalizeBadge = (unformattedBadge) => {
  const uniqueKey = createUniqueId(8);

  if (
    typeof unformattedBadge === "object" &&
    Object.prototype.hasOwnProperty.call(unformattedBadge, "e")
  ) {
    switch (unformattedBadge.e) {
      case "text": {
        if (Object.prototype.hasOwnProperty.call(unformattedBadge, "t")) {
          return { id: uniqueKey, type: "text", value: unformattedBadge.t };
        }

        return undefined;
      }

      case "emoji": {
        if (Object.prototype.hasOwnProperty.call(unformattedBadge, "u")) {
          return { id: uniqueKey, type: "emoji", value: unformattedBadge.u };
        }

        return undefined;
      }
    }
  }

  return undefined;
};
