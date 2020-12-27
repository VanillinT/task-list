import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { notificationRemoved } from "./notificationsSlice";

let displayed = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((store) => store.notifications.items);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }

        if (displayed.includes(key)) return;

        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            dispatch(notificationRemoved(myKey));
            removeDisplayed(myKey);
          },
        });

        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;
