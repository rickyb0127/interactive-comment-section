import { useState, useContext } from 'react';
import plusIcon from "../assets/icon-plus.svg";
import minusIcon from "../assets/icon-minus.svg";
import replyIcon from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";
import editIcon from "../assets/icon-edit.svg";
import Replies from './Replies';
import AddComment from './AddComment';
import { CommentContext } from '../CommentContext';
import DeleteConfirmation from './DeleteConfirmation';

function Comment(props) {
  const commentContext = useContext(CommentContext);
  const comment = props.comment;
  const replyingTo = props.replyingTo;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleClickedComment = (comment, index, event) => {
    let updatedComment = {...comment};

    switch(event) {
      case "REPLY":
        updatedComment.showAddReply = true;
        break;
      case "PLUS":
        updatedComment.score = comment.score + 1
        break;
      case "MINUS":
        updatedComment.score = comment.score - 1
        break;
    }

    commentContext.updateComment(updatedComment, index);
  };

  const deleteClicked = (index) => {
    setSelectedIndex(index);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    commentContext.deleteComment(selectedIndex);
    setSelectedIndex(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      {!isEditing ? 
        <div className="flex my-[10px] p-[20px] rounded border-transparent bg-white">
          <div className="flex flex-col mr-[20px] p-[5px] rounded bg-very-light-gray items-center gap-[10px] min-w-[40px] max-h-[88px] hidden-mobile">
            <div className="flex pt-[5px]"><img className="cursor-pointer" src={plusIcon} onClick={() => {handleClickedComment(comment, props.index, "PLUS")}} /></div>
            <div className="flex text-moderate-blue font-bold">{ comment.score }</div>
            <div className="flex pb-[5px]"><img className="cursor-pointer" src={minusIcon} onClick={() => {handleClickedComment(comment, props.index, "MINUS")}} /></div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between pb-[10px]">
              <div className="flex">
                <span className="pr-[15px]"><img className="h-[30px]" src={comment.user.image.png} /></span>
                <span className="pr-[15px] text-grayish-blue font-bold">{comment.user.username}</span>
                <span className="text-grayish-blue">{comment.createdAt}</span>
              </div>
              { comment.user.username === props.currentUser.username ?
                <div className="flex items-baseline hidden-mobile">
                  <span className="flex items-baseline mr-[20px] cursor-pointer" onClick={() => {deleteClicked(props.index)}}>
                    <img className="flex pr-[5px]" src={deleteIcon} />
                    <span className="flex text-soft-red font-bold">Delete</span>
                  </span>
                  <span className="flex items-baseline cursor-pointer" onClick={() => {setIsEditing(true)}}>
                    <img className="flex pr-[5px]" src={editIcon} />
                    <span className="flex text-moderate-blue font-bold">Edit</span>
                  </span>
                </div> : 
                <div className="flex items-baseline cursor-pointer hidden-mobile" onClick={() => {handleClickedComment(comment, props.index, "REPLY")}}>
                  <span className="pr-[10px]"><img src={replyIcon} /></span>
                  <span className="text-moderate-blue font-bold">Reply</span>
                </div>
              }
            </div>
            <div className="flex text-grayish-blue">
              <div>
                { replyingTo ?
                  <span className="text-moderate-blue font-bold">{ `@${replyingTo} ` }</span> :
                  null
                }
                <span>{ comment.content }</span>
              </div>
            </div>
            <div className="hidden flex-row show-mobile justify-between">
              <div className="flex p-[5px] rounded bg-very-light-gray items-center gap-[10px] min-w-[80px] max-h-[88px] justify-around">
                <div className="flex"><img className="cursor-pointer" src={plusIcon} onClick={() => {handleClickedComment(comment, props.index, "PLUS")}} /></div>
                <div className="flex text-moderate-blue font-bold">{ comment.score }</div>
                <div className="flex"><img className="cursor-pointer" src={minusIcon} onClick={() => {handleClickedComment(comment, props.index, "MINUS")}} /></div>
              </div>
              { comment.user.username === props.currentUser.username ?
                <div className="flex items-baseline">
                  <span className="flex items-baseline mr-[20px] cursor-pointer" onClick={() => {deleteClicked(props.index)}}>
                    <img className="flex pr-[5px]" src={deleteIcon} />
                    <span className="flex text-soft-red font-bold">Delete</span>
                  </span>
                  <span className="flex items-baseline cursor-pointer" onClick={() => {setIsEditing(true)}}>
                    <img className="flex pr-[5px]" src={editIcon} />
                    <span className="flex text-moderate-blue font-bold">Edit</span>
                  </span>
                </div> : 
                <div className="flex items-baseline cursor-pointer" onClick={() => {handleClickedComment(comment, props.index, "REPLY")}}>
                  <span className="pr-[10px]"><img src={replyIcon} /></span>
                  <span className="text-moderate-blue font-bold">Reply</span>
                </div>
              }
            </div>
          </div>
        </div> : 
        <AddComment currentUser={props.currentUser} comment={comment} parentIndex={props.index} childIndex={props.childIndex} isEditing={true} setIsEditing={setIsEditing} />
      }
      { comment.replies && comment.replies.length ?
        <div className="flex">
          <div className="my-[10px] w-[50px]"></div>
          <div className="my-[10px] border-l-2 border-light-gray w-[50px]"></div>
          <Replies replies={comment.replies} currentUser={props.currentUser} parentIndex={props.index} childIndex={props.childIndex} />        
        </div> :
        null
      }
      { comment.showAddReply ?
        <AddComment currentUser={props.currentUser} commentType={"REPLY"} comment={comment} parentIndex={props.index} childIndex={props.childIndex} /> : null
      }
      { showDeleteConfirmation &&
        <>
          <div className="fixed opacity-50 top-0 left-0 z-[1000] bg-light-gray h-full w-full"></div>
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[10000] h-[250px] w-[400px]">
            <DeleteConfirmation cancel={() => {setShowDeleteConfirmation(false)}} confirm={() => handleDelete} />
          </div>
        </>
      }
    </>
  )
}

export default Comment;