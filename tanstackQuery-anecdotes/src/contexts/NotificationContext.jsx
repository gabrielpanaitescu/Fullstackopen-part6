import { useReducer, useContext } from "react";
import { createContext } from "react";

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "set_notification":
      return action.payload;
    case "clear_notification":
      return "";
    default:
      return state;
  }
};

export const useNotificationDispatch = () => {
  const { notificationDispatch } = useContext(NotificationContext);

  const setNotification = (message, seconds = 5) => {
    notificationDispatch({ type: "set_notification", payload: message });

    setTimeout(() => {
      notificationDispatch({ type: "clear_notification" });
    }, seconds * 1000);
  };

  return setNotification;
};

export const useNotificationValue = () => {
  const { notification } = useContext(NotificationContext);
  return notification;
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
