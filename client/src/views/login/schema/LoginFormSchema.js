import { object, string } from "yup";

// Login Form Schema
export const loginSchema = object().shape({
  email: string().email("Invalid Email").required("required"),
  password: string().required("required"),
});

export const initialValueLogin = {
  email: "",
  password: "",
};
