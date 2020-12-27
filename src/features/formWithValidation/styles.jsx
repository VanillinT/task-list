import { makeStyles } from "@material-ui/core/styles";

export const useFormStyles = makeStyles((theme) => ({
  form: {
    background: "white",
    borderRadius: 5,
    minWidth: 300,
    boxShadow: theme.shadows[16],
  },
  header: {
    backgroundColor: theme.palette.secondary.light,
    padding: "0 30px",
    borderRadius: "5px 5px 0 0",
  },
  body: {
    padding: "0 20px 20px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginTop: "15px",
  },
  backdrop: {
    backgroundColor: "transparent",
  },
}));
