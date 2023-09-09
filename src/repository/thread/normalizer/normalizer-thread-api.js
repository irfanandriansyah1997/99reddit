import { formatDistanceStrict } from "date-fns";

import {
  DEFAULT_THREAD_LIST,
  THREAD_CONTENT_KIND,
  THREAD_VOTE_KIND,
} from "@/repository/thread/constant";

import { isImageFormat } from "@/utils/image";
import { normalizeBadge } from "@/utils/normalizer";
import {
  safeParseBoolean,
  safeParseNumber,
  safeParseString,
} from "@/utils/parser";

const _getThreadContent = (args) => {
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
    content = { type: THREAD_CONTENT_KIND.html, value: html };
  }

  if (typeof url === "string" && url) {
    if (isImageFormat(url)) {
      content = {
        type: THREAD_CONTENT_KIND.image,
        value: url,
      };
    } else {
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

  if (isIframeVideo) {
    content = {
      metadata: url,
      type: THREAD_CONTENT_KIND.videoIframe,
      value: secureMedia.oembed.html,
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
    url, // buat image
  } = thread;

  let content = _getThreadContent({
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

  let authorBadge = [];
  let titleBadge = [];

  if (Array.isArray(author_flair_richtext)) {
    authorBadge = author_flair_richtext.reduce((result, unformattedBadge) => {
      const formattingBadge = normalizeBadge(unformattedBadge);
      if (formattingBadge) result.push(formattingBadge);

      return result;
    }, authorBadge);
  }

  if (Array.isArray(link_flair_richtext)) {
    titleBadge = link_flair_richtext.reduce((result, unformattedBadge) => {
      const formattingBadge = normalizeBadge(unformattedBadge);
      if (formattingBadge) result.push(formattingBadge);

      return result;
    }, titleBadge);
  }

  return {
    author: safeParseString(author),
    authorBadge,
    content,
    createdDate: formatDistanceStrict(
      new Date(safeParseNumber(created_utc) * 1000),
      new Date(),
      { addSuffix: true }
    ),
    hideScore: safeParseBoolean(hide_score),
    id: safeParseString(id),
    numComments: safeParseNumber(num_comments),
    pinned: safeParseBoolean(stickied),
    score: safeParseNumber(score),
    title: safeParseString(title),
    titleBadge,
  };
};

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
    console.log(e);
    return DEFAULT_THREAD_LIST;
  }
};
