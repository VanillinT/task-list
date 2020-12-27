import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import LoginPopover from "../features/auth/LoginPopover";
import { useHeaderStyles } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedIn, loggedOut } from "../features/auth/userInfoSlice";

const Header = () => {
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginPopoverOpen, setLoginPopoverOpen] = React.useState(false);
  const styles = useHeaderStyles();

  const handleLogin = (e) => {
    setAnchorEl(e.currentTarget);
    setLoginPopoverOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(loggedOut());
  };

  const handleLoginPopoverClose = () => {
    setLoginPopoverOpen(false);
  };

  return (
    <Box className={styles.header}>
      <Typography variant="h4" className={styles.logo}>
        Tasks list
      </Typography>
      <div>
        {loggedIn ? (
          <Button
            onClick={handleLogout}
            disableRipple
            endIcon={<span className="material-icons">logout</span>}
          >
            Log Out
          </Button>
        ) : (
          <>
            <Button
              onClick={handleLogin}
              disableRipple
              endIcon={<span className="material-icons">login</span>}
            >
              Log in
            </Button>
            <LoginPopover
              anchorEl={anchorEl}
              open={loginPopoverOpen}
              onClose={handleLoginPopoverClose}
            />
          </>
        )}
      </div>
    </Box>
  );
};

export default Header;
