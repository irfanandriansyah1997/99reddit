import { normalizerThreadAPI } from "@/repository/thread/normalizer/normalizer-thread-api";

import { decodeHTMLEntities } from "@/utils/html";
import { normalizeBadgeList } from "@/utils/normalizer";
import {
  safeParseBoolean,
  safeParseNumber,
  safeParseString,
} from "@/utils/parser";

export const normalizerCommentList = (response) => {
  try {
    if (!response || !response.data) throw new Error();

    const {
      data: { children },
    } = response;

    let formattedComment = (children || []).reduce((result, commentItem) => {
      if (
        typeof commentItem === "object" &&
        commentItem &&
        typeof commentItem.data === "object" &&
        commentItem.data
      ) {
        const {
          author,
          author_flair_richtext,
          body_html,
          collapsed,
          created_utc,
          replies,
          score,
        } = commentItem.data;

        result.push({
          author: safeParseString(author),
          body: decodeHTMLEntities(safeParseString(body_html)),
          collapsed: safeParseBoolean(collapsed),
          createdDate: safeParseNumber(created_utc),
          replies: normalizerCommentList(replies).comments,
          score: safeParseNumber(score),
          titleBadge: normalizeBadgeList(author_flair_richtext),
        });
      }

      return result;
    }, []);

    return {
      comments: formattedComment,
    };
  } catch (e) {
    return {
      comments: [],
    };
  }
};

export const normalizerCommentAPI = (response) => {
  try {
    if (!response || (Array.isArray(response) && response.length < 2)) {
      throw new Error();
    }

    const [unformattedThreadItem, unformattedComment] = response;

    const {
      threadList: [threadItem],
    } = normalizerThreadAPI(unformattedThreadItem);
    const { comments } = normalizerCommentList(unformattedComment);

    if (threadItem) {
      return {
        comments,
        thread: threadItem,
      };
    }
  } catch {
    return {
      comments: [],
      thread: undefined,
    };
  }
};
