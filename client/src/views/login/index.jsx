import { Box, Typography, useTheme } from "@mui/material";
import Form from "./Form";
import Loader from "components/Loader";

const Login = () => {
  const theme = useTheme();

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="center"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="bold" fontSize="2rem" color="primary">
          Socialigram
        </Typography>
      </Box>

      <Loader />
      {/* FORM */}
      <Form />
    </Box>
  );
};

export default Login;
