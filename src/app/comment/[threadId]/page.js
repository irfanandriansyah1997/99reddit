import { notFound } from "next/navigation";

import CommentsModules from "@/modules/comments";
import { fetchCommentAPI } from "@/repository/comment/fetch-comment-api";

/**
 * INFO: We may uncomment this part if we wish to add a title attribute or other metadata for SEO purposes.
 */

// export async function generateMetadata(props) {
//   const { params: { threadId } = {} } = props;
//   const { result } = await getThreadComment({ threadId });

//   if (result && result.thread) {
//     const { thread: { title } } = result;
//     return {
//       title,
//     };
//   }
// }

const CommentRouting = async (props) => {
  const { params: { threadId } = {} } = props;
  const { error, result } = await fetchCommentAPI({ threadId });

  if (error || typeof result === "undefined") return notFound();

  return <CommentsModules comments={result.comments} thread={result.thread} />;
};

export default CommentRouting;
