import React from "react";
import { Popover } from "@material-ui/core";
import PropType from "prop-types";
import { validateText, validateUsername } from "../../utils/validators";
import FormWithValidation from "../formWithValidation/FormWithValidation";
import { useDispatch, useSelector } from "react-redux";
import { fetchToken, errorNullified } from "./userInfoSlice";

const LoginPopover = ({ anchorEl, open, onClose }) => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.user.error);
  const fieldsOptionsMap = {
    username: { validator: validateUsername },
    password: {
      validator: validateText("Enter password"),
      props: { type: "password" },
    },
  };

  const handleSubmit = (data) => {
    dispatch(fetchToken(data)).then(({ payload: { status } }) => {
      if (status === "ok" && onClose) onClose();
    });
  };

  const handleClose = () => {
    onClose();
    dispatch(errorNullified());
  };

  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <FormWithValidation
        submitButtonLabel="Log in"
        fieldsOptionsMap={fieldsOptionsMap}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </Popover>
  );
};

LoginPopover.propTypes = {
  anchorEl: PropType.object,
  open: PropType.bool,
  onClose: PropType.func,
};

export default LoginPopover;
