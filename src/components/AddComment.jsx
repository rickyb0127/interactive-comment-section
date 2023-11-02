import { useState, useContext } from 'react';
import { CommentContext } from '../CommentContext';
import { v4 as uuidv4 } from 'uuid';

function AddComment(props) {
  const commentContext = useContext(CommentContext);
  const comment = props.comment;

  const getInitialCommentText = () => {
    if(props.isEditing) {
      return comment.content;
    }

    return "";
  };

  const [commentText, setCommentText] = useState(getInitialCommentText());

  const getButtonText = () => {
    if(props.isEditing) {
      return "UPDATE";
    } else if(props.commentType === 'REPLY') {
      return "REPLY";
    } else {
      return "SEND";
    }
  };

  const editComment = () => {
    const updatedComment = {
      ...comment,
      content: commentText
    };

    if(props.commentType === "REPLY") {
      commentContext.updateReply(updatedComment, props.parentIndex, props.childIndex);
    } else {
      commentContext.updateComment(updatedComment, props.parentIndex);
    }

    props.setIsEditing(false);
  };

  const addComment = () => {
    if(props.commentType === "REPLY") {
      if(props.childIndex === undefined) {
        // first level reply        
        const reply = {
          id: uuidv4(),
          content: commentText,
          createdAt: "now",
          score: 0,
          replyingTo: comment.user.username,
          user: props.currentUser,
          showAddReply: false
        };

        commentContext.createReply(reply, comment);
      } else {
        // second level reply
        const reply = {
          id: uuidv4(),
          content: commentText,
          createdAt: "now",
          score: 0,
          replyingTo: comment.user.username,
          user: props.currentUser,
          showAddReply: false
        };

        commentContext.createMultiLevelReply(reply, props.parentIndex, props.childIndex);
      }
    } else {
      const newComment = {
        id: uuidv4(),
        content: commentText,
        createdAt: "now",
        score: 0,
        user: props.currentUser,
        replies: [],
        showAddReply: false
      };

      commentContext.createNewComment(newComment);
      setCommentText("");
    }
  };

  const submitComment = () => { 
    if(props.isEditing) {
      editComment();
    } else {
      addComment();
    }
  };

  return (
    <>
      <div className="flex flex-col my-[10px] p-[20px] rounded border-transparent bg-white">
        <div className="flex justify-between items-start">
          <div className="flex"><span className="pr-[15px]"><img className="h-[30px]" src={props.currentUser.image.png} /></span></div>
          <div className="flex basis-[80%] pr-[10px]">
            <textarea 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full resize-none border border-light-gray rounded p-[15px]" 
              rows="4" 
              placeholder={props.commentType === 'REPLY' ? "" : "Add a comment..."}>
            </textarea>
          </div>
          <div className="flex">
            <button onClick={ submitComment } className="px-[20px] py-[10px] bg-moderate-blue rounded-md text-white">
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddComment;