import { createContext, useState } from "react";
import { data } from './assets/data';

const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState(data.comments);

  const updateComment = (updatedComment, indexToUpdate) => {
    let updatedComments = [...comments];
    updatedComments[indexToUpdate] = updatedComment;

    setComments(updatedComments);
  };

  const updateReply = (updatedReply, parentIndex, childIndex) => {
    let updatedComments = [...comments];
    updatedComments[parentIndex].replies[childIndex] = updatedReply;

    setComments(updatedComments);
  };

  const createNewComment = (comment) => {
    let updatedComments = [...comments];
    updatedComments.push(comment);

    setComments(updatedComments);
  };

  const createReply = (reply, commentToUpdate) => {
    let updatedComments = [...comments];
    const index = updatedComments.map(comment => comment.id).indexOf(commentToUpdate.id);
    updatedComments[index].showAddReply = false;
    updatedComments[index].replies.push(reply);

    setComments(updatedComments);
  };

  const createMultiLevelReply = (newReply, parentIndex, childIndex) => {
    let updatedComments = [...comments];
    updatedComments[parentIndex].replies[childIndex].showAddReply = false;
    updatedComments[parentIndex].replies.push(newReply)

    setComments(updatedComments);
  };

  const deleteComment = (commentIndex) => {
    let updatedComments = [...comments];
    updatedComments.splice(commentIndex, 1);

    setComments(updatedComments);
  };

  const deleteReply = (parentIndex, replyIndex) => {
    let updatedComments = [...comments];
    updatedComments[parentIndex].replies.splice(replyIndex, 1);

    setComments(updatedComments);
  };

  return (
    <CommentContext.Provider value={{ 
      comments, 
      updateComment, 
      createNewComment, 
      createReply, 
      updateReply, 
      createMultiLevelReply,
      deleteComment,
      deleteReply
    }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentContext, CommentProvider };