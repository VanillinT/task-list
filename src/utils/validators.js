import { stringIsEmail } from "./helpers";

export const validateEmail = (_email) => {
  if (_email.length === 0) return "Enter Email";
  else if (!stringIsEmail(_email)) {
    return "Incorrect email format.";
  } else return "";
};

export const validateUsername = (username) => {
  if (username.length === 0) return "Enter Username";
  else if (username.length < 3) return "Username is too short";
  else if (username.length > 14) return "Username is too long";
  else return "";
};

export const validateText = (errormsg) => (text) => {
  if (text.length === 0) return errormsg;
  else return "";
};
