import Comments from "./components/Comments";
import AddComment from './components/AddComment';
import { data } from './assets/data';
import { CommentProvider } from './CommentContext';

function App() {
  const currentUser = data.currentUser;

  return (
    <CommentProvider>
      <div className="container py-[50px]">
        <Comments currentUser={currentUser} />
        <AddComment currentUser={currentUser} />
      </div>
    </CommentProvider>
  )
}

export default App;