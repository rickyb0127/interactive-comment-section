import { useContext } from 'react';
import Comment from './Comment';
import { CommentContext } from '../CommentContext';

function Comments(props) {
  const commentContext = useContext(CommentContext);
  const comments = commentContext.comments;

  const commentsView = comments.map((comment, index) => {
    return (
      <div key={comment.id}>
        <Comment currentUser={props.currentUser} comment={comment} index={index} />
      </div>
    )
  });

  return (
    <>
      <div className="flex flex-col">
        { commentsView }
      </div>
    </>
  )
}

export default Comments;