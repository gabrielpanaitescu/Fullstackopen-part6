import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const vote = (id) => {
    dispatch(voteAnecdote(id));
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
      <AnecdoteForm />
    </div>
  );
};

export default App;
