import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const sendNotification = (message, durationInSeconds = 5) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 1000 * durationInSeconds);
  };
};

export default notificationSlice.reducer;
