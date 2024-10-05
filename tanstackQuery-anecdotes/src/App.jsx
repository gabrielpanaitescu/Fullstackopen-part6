import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./services/anecdotesRequests";
import { useNotificationDispatch } from "./contexts/NotificationContext";

const App = () => {
  const setNotification = useNotificationDispatch();
  const queryClient = useQueryClient();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    updateAnecdoteMutation.mutate(updatedAnecdote);
    setNotification(`anecdote "${anecdote.content}" voted`, 5);
  };

  if (isPending) return <div>loading...</div>;

  if (isError) {
    console.log(error);
    return <div>anecdotes services not available due to server issues</div>;
  }

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
