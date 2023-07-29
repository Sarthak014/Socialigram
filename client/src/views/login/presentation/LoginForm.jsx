import { TextField } from "@mui/material";

export const LoginForm = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <>
      <TextField
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(touched.email) && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(touched.password) && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        sx={{ gridColumn: "span 4" }}
      />
    </>
  );
};

export default LoginForm;
