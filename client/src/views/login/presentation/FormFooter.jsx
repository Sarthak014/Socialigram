import { Box, Button, Typography } from "@mui/material";

const FormFooter = ({ isLogin, palette, setPageType, resetForm }) => {
  return (
    <Box>
      <Button
        fullWidth
        type="submit"
        sx={{
          m: "2rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
      >
        {isLogin ? "Login" : "REGISTER"}
      </Button>
      <Typography
        onClick={() => {
          setPageType(isLogin ? "register" : "login");
          resetForm();
        }}
        sx={{
          textDecoration: "underline",
          color: palette.primary.main,
          "&:hover": {
            cursor: "pointer",
            color: palette.primary.light,
          },
        }}
      >
        {isLogin
          ? "Don't have an account? Sign up here."
          : "Already have an account? Login here."}
      </Typography>
    </Box>
  );
};

export default FormFooter;
