import Reply from './Reply';

function Replies(props) {
  const replies = props.replies;

  const repliesView = replies.map((reply, index) => {
    return (
      <div key={reply.id}>
        <Reply reply={reply} replyingTo={reply.replyingTo} currentUser={props.currentUser} parentIndex={props.parentIndex} index={index} />
      </div>
    )
  });
  
  return (
    <>
      <div className="flex flex-col w-full">
        { repliesView }
      </div>
    </>
  )
}

export default Replies;