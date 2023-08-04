import { object, string } from "yup";

// Register Form Schema
export const registerSchema = object().shape({
  firstName: string().required("Field is Required"),
  lastName: string().required("Field is Required"),
  email: string().email("Invalid Email").required("Field is Required"),
  password: string().required("Field is Required"),
  location: string().required("Field is Required"),
  occupation: string().required("Field is Required"),
  picture: string().required("Field is Required"),
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
