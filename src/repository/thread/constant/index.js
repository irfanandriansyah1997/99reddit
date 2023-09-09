export const THREAD_KIND = {
  hot: 1,
  new: 2,
  top: 3,
};

export const THREAD_VOTE_KIND = {
  downVote: -1,
  none: 0,
  upVote: 1,
};

export const THREAD_CONTENT_KIND = {
  html: 0,
  image: 1,
  link: 2, // link
  video: 3,
  videoIframe: 4, // youtube
};

export const DEFAULT_THREAD_KIND = THREAD_KIND.hot;

export const MAX_THREAD_ITEM = 25;

export const DEFAULT_THREAD_LIST = {
  hasAvailableNextPage: { state: false, threadId: undefined },
  threadId: {},
  threadList: [],
};
