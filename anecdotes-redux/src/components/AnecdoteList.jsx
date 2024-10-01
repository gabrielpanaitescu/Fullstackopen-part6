import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { sendNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} votes</div>
      <button onClick={handleClick}>vote</button>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toUpperCase().includes(filter.toUpperCase())
    );
  });

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(sendNotification(`you voted ${anecdote.content}`), 5);
  };

  const sortedAnecdotes =
    anecdotes && [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <>
      {sortedAnecdotes.map((anecdote) => {
        return (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote)}
          />
        );
      })}
    </>
  );
};

export default AnecdoteList;
