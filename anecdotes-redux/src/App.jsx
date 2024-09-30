import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote, createAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.anecdote.value));
    e.target.anecdote.value = "";
  };

  const sortedAnecdotes =
    anecdotes && [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => {
        return (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes} votes</div>
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        );
      })}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
