import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAnecdote = createAsyncThunk(
  "anecdotes/createAnecdote",
  async (content, thunkAPI) => {
    return await anecdoteService.create(content);
  }
);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    increaseVote(state, action) {
      const updatedAnecdote = action.payload;
      const id = updatedAnecdote.id;
      return state.map((anecdote) =>
        anecdote.id === id ? updatedAnecdote : anecdote
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAnecdote.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export default anecdoteSlice.reducer;
export const { setAnecdotes, increaseVote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteAnecdote = (id) => {
  return async function (dispatch, getState) {
    const { anecdotes } = getState();
    const anecdoteToChange = anecdotes.find((anecdote) => anecdote.id === id);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };

    const returnedAnecdote = await anecdoteService.update(id, changedAnecdote);

    dispatch(increaseVote(returnedAnecdote));
  };
};
