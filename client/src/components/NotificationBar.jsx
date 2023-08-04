import { Slide, Snackbar, IconButton, useMediaQuery } from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "store/authSlicer";
import { useState } from "react";
import { useEffect } from "react";

const Notification = ({ timeout }) => {
  const [state, setState] = useState({
    vertical: "bottom",
    horizontal: "left",
  });
  const { vertical, horizontal } = state;

  const dispatch = useDispatch();
  const { show, message } = useSelector((state) => state.notification);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  // Methhod
  function handleClose() {
    dispatch(updateNotification({ show: false, message: "" }));
  }

  function anchorAlignment() {
    if (isNonMobileScreen) {
      setState({ vertical: "bottom", horizontal: "left" });
    }

    setState({ vertical: "bottom", horizontal: "center" });
  }

  // Hooks
  useEffect(() => {
    anchorAlignment();
  }, [isNonMobileScreen]);

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={show}
        onClose={handleClose}
        message={message}
        autoHideDuration={timeout ? timeout : 5000}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
        key={"snackbar_post_notification"}
      />
    </Slide>
  );
};

export default Notification;
