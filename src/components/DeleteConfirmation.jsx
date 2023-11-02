function DeleteConfirmation(props) {
  return (
    <>
      <div className="flex flex-col bg-white h-full w-full justify-evenly px-[40px] rounded-md">
        <div>
          <h1 className="text-2xl font-semibold">Delete comment</h1>
        </div>
        <div>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</div>
        <div className="flex justify-between">
          <button onClick={ props.cancel } className="flex px-[20px] py-[10px] bg-grayish-blue rounded-md text-white">NO, CANCEL</button>
          <button onClick={ props.confirm() } className="flex px-[20px] py-[10px] bg-soft-red rounded-md text-white">YES, DELETE</button>
        </div>
      </div>
    </>
  )
}

export default DeleteConfirmation;