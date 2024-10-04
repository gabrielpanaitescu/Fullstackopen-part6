import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./services/anecdotesRequests";

const App = () => {
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
  };

  if (isPending) return <div>loading...</div>;

  if (isError) {
    console.log(error);
    return <div>anecdotes services not available due to server issues</div>;
  }

  const anecdotes = data;
  console.log(anecdotes);

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
