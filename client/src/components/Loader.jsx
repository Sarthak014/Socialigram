import { Box, Fade } from "@mui/material";
import { useSelector } from "react-redux";
import Icon from "assets/Spinner.svg";

const Loader = ({ height }) => {
  const loading = useSelector((state) => state.loading);

  return (
    <Fade
        in={loading}
        unmountOnExit
      >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: height,
          opacity: "0.5 !important",
          backgroundColor: "whitesmoke",
          zIndex: "9999",
        }}
      >
        <img
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "brightness(0)",
            inlineSize: "6rem",
          }}
          src={Icon}
          alt="Loading..."
        />
      </Box>
    </Fade>
  );
};

export default Loader;
