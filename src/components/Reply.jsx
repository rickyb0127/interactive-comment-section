import { useState, useContext } from 'react';
import plusIcon from "../assets/icon-plus.svg";
import minusIcon from "../assets/icon-minus.svg";
import replyIcon from "../assets/icon-reply.svg";
import deleteIcon from "../assets/icon-delete.svg";
import editIcon from "../assets/icon-edit.svg";
import Replies from './Replies';
import AddComment from './AddComment';
import DeleteConfirmation from './DeleteConfirmation';
import { CommentContext } from '../CommentContext';

function Reply(props) {
  const commentContext = useContext(CommentContext);
  const reply = props.reply;
  const replyingTo = props.replyingTo;
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedParentIndex, setSelectedParentIndex] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClickedReply = (reply, parentIndex, index, event) => {
    let updatedReply = {...reply};

    switch(event) {
      case "REPLY":
        updatedReply.showAddReply = true;
        break;
      case "PLUS":
        updatedReply.score = reply.score + 1
        break;
      case "MINUS":
        updatedReply.score = reply.score - 1
        break;
    }

    commentContext.updateReply(updatedReply, parentIndex, index);
  };

  const deleteClicked = (parentIndex, index) => {
    setSelectedParentIndex(parentIndex)
    setSelectedIndex(index);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    commentContext.deleteReply(selectedParentIndex, selectedIndex);
    setSelectedParentIndex(null);
    setSelectedIndex(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      {!isEditing ? 
        <div className="flex my-[10px] p-[20px] rounded border-transparent bg-white">
          <div className="flex flex-col mr-[20px] p-[5px] rounded bg-very-light-gray items-center gap-[10px] min-w-[40px] max-h-[88px] hidden-mobile">
            <div className="flex pt-[5px]"><img className="cursor-pointer" src={plusIcon} onClick={() => {handleClickedReply(reply, props.parentIndex, props.index, "PLUS")}} /></div>
            <div className="flex text-moderate-blue font-bold">{ reply.score }</div>
            <div className="flex pb-[5px]"><img className="cursor-pointer" src={minusIcon} onClick={() => {handleClickedReply(reply, props.parentIndex, props.index, "MINUS")}} /></div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between pb-[10px]">
              <div className="flex">
                <span className="pr-[15px]"><img className="h-[30px]" src={reply.user.image.png} /></span>
                <span className="pr-[15px] text-grayish-blue font-bold">{reply.user.username}</span>
                <span className="text-grayish-blue">{reply.createdAt}</span>
              </div>
              { reply.user.username === props.currentUser.username ?
                <div className="flex items-baseline hidden-mobile">
                  <span className="flex items-baseline mr-[20px] cursor-pointer" onClick={() => {deleteClicked(props.parentIndex, props.index)}}>
                    <img className="flex pr-[5px]" src={deleteIcon} />
                    <span className="flex text-soft-red font-bold">Delete</span>
                  </span>
                  <span className="flex items-baseline cursor-pointer" onClick={() => {setIsEditing(true)}}>
                    <img className="flex pr-[5px]" src={editIcon} />
                    <span className="flex text-moderate-blue font-bold">Edit</span>
                  </span>
                </div> : 
                <div className="flex items-baseline cursor-pointer hidden-mobile" onClick={() => {handleClickedReply(reply, props.parentIndex, props.index, "REPLY")}}>
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
                <span>{ reply.content }</span>
              </div>
            </div>
            <div className="hidden flex-row show-mobile justify-between">
              <div className="flex p-[5px] rounded bg-very-light-gray items-center gap-[10px] min-w-[80px] max-h-[88px] justify-around">
                <div className="flex"><img className="cursor-pointer" src={plusIcon} onClick={() => {handleClickedReply(reply, props.parentIndex, props.index, "PLUS")}} /></div>
                <div className="flex text-moderate-blue font-bold">{ reply.score }</div>
                <div className="flex"><img className="cursor-pointer" src={minusIcon} onClick={() => {handleClickedReply(reply, props.parentIndex, props.index, "MINUS")}} /></div>
              </div>
              { reply.user.username === props.currentUser.username ?
                <div className="flex items-baseline">
                  <span className="flex items-baseline mr-[20px] cursor-pointer" onClick={() => {deleteClicked(props.parentIndex, props.index)}}>
                    <img className="flex pr-[5px]" src={deleteIcon} />
                    <span className="flex text-soft-red font-bold">Delete</span>
                  </span>
                  <span className="flex items-baseline cursor-pointer" onClick={() => {setIsEditing(true)}}>
                    <img className="flex pr-[5px]" src={editIcon} />
                    <span className="flex text-moderate-blue font-bold">Edit</span>
                  </span>
                </div> : 
                <div className="flex items-baseline cursor-pointer" onClick={() => {handleClickedReply(reply, props.parentIndex, props.index, "REPLY")}}>
                  <span className="pr-[10px]"><img src={replyIcon} /></span>
                  <span className="text-moderate-blue font-bold">Reply</span>
                </div>
              }
            </div>
          </div>
        </div> : 
        <AddComment currentUser={props.currentUser} commentType={"REPLY"} comment={reply} parentIndex={props.parentIndex} childIndex={props.index} isEditing={true} setIsEditing={setIsEditing} />
      }
      { reply.replies && reply.replies.length ?
        <div className="flex">
          <div className="my-[10px] w-[50px]"></div>
          <div className="my-[10px] border-l-2 border-light-gray w-[50px]"></div>
          <Replies replies={reply.replies} currentUser={props.currentUser} parentIndex={props.parentIndex} index={props.index} />        
        </div> :
        null
      }
      { reply.showAddReply ?
        <AddComment currentUser={props.currentUser} commentType={"REPLY"} comment={reply} parentIndex={props.parentIndex} childIndex={props.index} /> : null
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

export default Reply;