import { THREAD_CONTENT_KIND } from "@/repository/thread/constant";

import { decodeHTMLEntities } from "./html";
import { isImageFormat } from "./image";
import { safeParseBoolean, safeParseNumber, safeParseString } from "./parser";
import { createUniqueId } from "./uuid";

///////////////////////////////////////////////////////////////////////////
// Normalizer Badge Object
///////////////////////////////////////////////////////////////////////////

const _normalizeBadgeItem = (unformattedBadgeItem) => {
  const uniqueKey = createUniqueId(8);

  if (
    typeof unformattedBadgeItem === "object" &&
    Object.prototype.hasOwnProperty.call(unformattedBadgeItem, "e")
  ) {
    switch (unformattedBadgeItem.e) {
      case "text": {
        if (Object.prototype.hasOwnProperty.call(unformattedBadgeItem, "t")) {
          return { id: uniqueKey, type: "text", value: unformattedBadgeItem.t };
        }

        return undefined;
      }

      case "emoji": {
        if (Object.prototype.hasOwnProperty.call(unformattedBadgeItem, "u")) {
          return {
            id: uniqueKey,
            type: "emoji",
            value: unformattedBadgeItem.u,
          };
        }

        return undefined;
      }
    }
  }

  return undefined;
};

export const normalizeBadgeList = (unformattedBadgeList) => {
  if (Array.isArray(unformattedBadgeList)) {
    return unformattedBadgeList.reduce((result, unformattedBadge) => {
      const formattingBadge = _normalizeBadgeItem(unformattedBadge);
      if (formattingBadge) result.push(formattingBadge);

      return result;
    }, []);
  }

  return [];
};

///////////////////////////////////////////////////////////////////////////
// Normalizer Thread Item
///////////////////////////////////////////////////////////////////////////

export const normalizeThreadContent = (args) => {
  const { html, isVideo, media, secureMedia, url } = args;
  let content = undefined;

  const isReditVideo =
    isVideo &&
    typeof media === "object" &&
    media &&
    Object.prototype.hasOwnProperty.call(media, "reddit_video") &&
    media.reddit_video;
  const isIframeVideo =
    typeof secureMedia === "object" &&
    secureMedia &&
    Object.prototype.hasOwnProperty.call(secureMedia, "oembed") &&
    secureMedia.oembed &&
    Object.prototype.hasOwnProperty.call(secureMedia.oembed, "html") &&
    secureMedia.oembed.html;

  if (typeof html === "string" && html) {
    content = {
      type: THREAD_CONTENT_KIND.html,
      value: decodeHTMLEntities(html),
    };
  }

  if (typeof url === "string" && url) {
    if (isImageFormat(url)) {
      content = {
        type: THREAD_CONTENT_KIND.image,
        value: url,
      };
    } else if (typeof content === "undefined") {
      content = {
        type: THREAD_CONTENT_KIND.link,
        value: url,
      };
    }
  }

  if (isReditVideo) {
    content = {
      type: THREAD_CONTENT_KIND.video,
      value: media.reddit_video.fallback_url,
    };
  }

  if (isIframeVideo && typeof content === "undefined") {
    content = {
      metadata: url,
      type: THREAD_CONTENT_KIND.videoIframe,
      value: decodeHTMLEntities(safeParseString(secureMedia.oembed.html)),
    };
  }

  return content;
};

export const normalizerThreadItem = (thread) => {
  const {
    author,
    author_flair_richtext,
    created_utc,
    hide_score,
    id,
    is_video,
    link_flair_richtext,
    media,
    num_comments,
    score,
    secure_media,

    selftext_html,
    stickied,
    title,
    url,
  } = thread;

  let content = normalizeThreadContent({
    html: selftext_html,
    isVideo: is_video,
    media,
    secureMedia: secure_media,
    url,
  });

  /**
   * INFO: will be returning undefined content thread is undefined
   */
  if (typeof content === "undefined") return undefined;

  return {
    author: safeParseString(author),
    authorBadge: normalizeBadgeList(author_flair_richtext),
    content,
    createdDate: safeParseNumber(created_utc),
    description: decodeHTMLEntities(
      safeParseString(selftext_html)
        .replace(/(<([^>]+)>).*(<([^>]+)>)/, "")
        .slice(0, 300)
    ),
    hideScore: safeParseBoolean(hide_score),
    id: safeParseString(id),
    numComments: safeParseNumber(num_comments),
    pinned: safeParseBoolean(stickied),
    score: safeParseNumber(score),
    title: safeParseString(title),
    titleBadge: normalizeBadgeList(link_flair_richtext),
  };
};
