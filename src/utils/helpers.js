import { notificationAdded } from "../features/notifications/notificationsSlice";

export const stringIsEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

export const dispatchNotificationForResult = (dispatch, result, message) => {
  const resultIsArray = !!result.length;
  const success = resultIsArray
    ? result[0].status === "ok"
    : result.status === "ok";
  dispatch(
    notificationAdded({
      message: success
        ? message
        : `ERROR: ${JSON.stringify(
            (resultIsArray ? result[0] : result).message
          )}`,
      key: new Date().getTime() + Math.random(),
      options: {
        variant: success ? "success" : "error",
      },
    })
  );
};
