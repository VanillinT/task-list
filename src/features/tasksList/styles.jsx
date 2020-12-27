import { makeStyles } from "@material-ui/core/styles";

export const useAddTaskModalStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    outline: "none",
  },
});

export const useTasksListStyles = makeStyles({
  tableContainer: {
    height: 400,
  },
  tableBody: {
    position: "relative",
  },
  utilsWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    margin: "auto",
  },
  button: {
    marginRight: 10,
  },
  pagination: {},
  textField: {
    width: "100%",
    border: "none",
  },
});
