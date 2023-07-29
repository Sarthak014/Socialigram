import { object, string } from "yup";

// Register Form Schema
export const registerSchema = object().shape({
  firstName: string().required("required"),
  lastName: string().required("required"),
  email: string().email("Invalid Email").required("required"),
  password: string().required("required"),
  location: string().required("required"),
  occupation: string().required("required"),
  picture: string().required("required"),
});


export const initialValueRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};
