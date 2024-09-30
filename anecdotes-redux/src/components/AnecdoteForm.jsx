import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.anecdote.value));
    e.target.anecdote.value = "";
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input type="text" name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
