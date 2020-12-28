import { notificationAdded } from "../features/notifications/notificationsSlice";

export const stringIsEmail = (str) =>
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(str);

export const dispatchNotificationForResult = (dispatch, result, _message) => {
  const resultIsArray = !!result.length;
  const success = resultIsArray
    ? result[0].status === "ok"
    : result.status === "ok";

  const resultMessage = (resultIsArray ? result[0] : result).message;

  dispatch(
    notificationAdded({
      message: success ? _message : `ERROR: ${JSON.stringify(resultMessage)}`,
      key: new Date().getTime() + Math.random(),
      options: {
        variant: success ? "success" : "error",
      },
    })
  );
};

export const getTokenFromCookie = () => {
  return (
    document.cookie
      ?.split(";")
      .find((row) => row.trim().startsWith("token"))
      ?.split("=")[1] || ""
  );
};

export const putTokenInCookie = (token) => {
  document.cookie = `token=${token}; path=/`;
};
