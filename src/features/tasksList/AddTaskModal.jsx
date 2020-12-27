import React from "react";
import { Modal, Fade, Box } from "@material-ui/core";
import { newTaskCreated, errorNullified } from "./tasksSlice";
import { modalClosed } from "./taskModalSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  validateEmail,
  validateUsername,
  validateText,
} from "../../utils/validators";
import { useAddTaskModalStyles } from "./styles";
import FormWithValidation from "../formWithValidation/FormWithValidation";

const AddTaskModal = () => {
  const open = useSelector((state) => state.newTaskModal.open);
  const errors = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();
  const styles = useAddTaskModalStyles();

  const handleSubmit = (data) => {
    dispatch(newTaskCreated(data));
  };

  const handleClose = () => {
    dispatch(modalClosed());
    dispatch(errorNullified());
  };

  const fieldsOptionsMap = {
    username: { validator: validateUsername },
    email: { validator: validateEmail },
    text: {
      validator: validateText("This field cannot be empty"),
      props: {
        multiline: true,
        rows: 3,
        rowsMax: 5,
      },
    },
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.modal}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box className={styles.wrapper}>
          <FormWithValidation
            fieldsOptionsMap={fieldsOptionsMap}
            errors={errors}
            onSubmit={handleSubmit}
            title="Add new task"
            submitButtonLabel="Add"
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddTaskModal;
