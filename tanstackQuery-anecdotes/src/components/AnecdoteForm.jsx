import { useMutation } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotesRequests";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const setNotification = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    retry: 1,
    onSuccess(newAnecdote) {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      setNotification(`added anecdote "${newAnecdote.content}"`, 5);
    },
    onError(error) {
      if (
        error.response.data.error ===
        "too short anecdote, must have length 5 or more"
      )
        setNotification(`anecdote must be at least 5 chars long"`, 5);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      {newAnecdoteMutation.isPending ? (
        <p>creating anecdote...</p>
      ) : (
        <form onSubmit={onCreate}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
      )}
    </div>
  );
};

export default AnecdoteForm;
