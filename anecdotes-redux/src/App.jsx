import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes}</div>
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        );
      })}
      <h2>create new</h2>
      <form>
        <div>
          <input type="text" />
          <button>create</button>
        </div>
      </form>
    </div>
  );
};

export default App;
