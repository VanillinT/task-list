import { makeStyles } from "@material-ui/core/styles";

export const useAppStyles = makeStyles({
  body: {
    display: "flex",
    paddingTop: 100,
    width: "100%",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
  },
});

export const useHeaderStyles = makeStyles((theme) => ({
  header: {
    position: "fixed",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    backgroundColor: theme.palette.secondary.light,
  },
  logo: {
    pointerEvents: "none",
  },
}));

export const useLoginPopoverStyles = makeStyles({
  loginPopover: {
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
    minWidth: 250,
  },
});
