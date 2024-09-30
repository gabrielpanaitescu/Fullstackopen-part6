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

  test('returns new state with action "VOTE_ANECDOTE"', () => {
    const action = {
      type: "VOTE_ANECDOTE",
      payload: {
        id: 2,
      },
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
});
