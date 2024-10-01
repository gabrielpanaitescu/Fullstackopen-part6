import anecdoteReducer from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  const initialState = [
    {
      content: "If it hurts, do it more often",
      id: 1,
      votes: 0,
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      id: 2,
      votes: 0,
    },
  ];

  test('returns new state with action "INCREMENT_VOTE"', () => {
    const action = {
      type: "anecdotes/voteAnecdote",
      payload: 2,
    };

    const state = initialState;
    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(2);
    expect(newState).toContainEqual(state[0]);
    expect(newState).toContainEqual({
      content: "Adding manpower to a late software project makes it later!",
      id: 2,
      votes: 1,
    });
  });

  test('returns new state with action "NEW_ANECDOTE"', () => {
    const action = {
      type: "anecdotes/createAnecdote",
      payload: "Testing the new anecdote action",
    };

    const state = initialState;
    deepFreeze(state);

    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(3);
    expect(newState.map((anecdote) => anecdote.content)).toContainEqual(
      action.payload
    );
  });
});
