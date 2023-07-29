import { useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading, setLogin } from "store/authSlicer";
import { loginSchema, initialValueLogin } from "./schema/LoginFormSchema";
import {
  registerSchema,
  initialValueRegister,
} from "./schema/RegisterFormSchema";
import FormHeader from "./presentation/FormHeader";
import RegisterForm from "./presentation/RegisterForm";
import LoginForm from "./presentation/LoginForm";
import FormFooter from "./presentation/FormFooter";
import { registerApi } from "api/register";
import { loginApi } from "api/login";

const Form = () => {
  // init
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Data
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Methods
  const register = async (values, onSubmitProps) => {
    await dispatch(
      setLoading({
        loading: true,
      })
    );
    const savedUserResponse = await registerApi(values);

    // resetting the form after form submit and api call
    onSubmitProps.resetForm();
    await dispatch(
      setLoading({
        loading: false,
      })
    );

    if (savedUserResponse) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    await dispatch(
      setLoading({
        loading: true,
      })
    );
    const loggedInResponse = await loginApi(values);

    // resetting the form after form submit and api call
    onSubmitProps.resetForm();

    if (loggedInResponse) {
      await dispatch(
        setLogin({
          user: loggedInResponse.user,
          token: loggedInResponse.token,
        }),
        setLoading({
          loading: false,
        })
      );

      navigate("/home");
    } else {
      await dispatch(
        setLoading({
          loading: false,
        })
      );
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m={isLogin ?"14% auto" : "2rem auto"}
        borderRadius="1.5rem"
        backgroundColor={palette.background.alt}
      >
        <FormHeader />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isLogin ? initialValueLogin : initialValueRegister}
          validationSchema={isLogin ? loginSchema : registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {/* If the form pageType is register then show register form field along with common form fields i.e. email and password */}
                {isRegister && (
                  <RegisterForm
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    palette={palette}
                  />
                )}
                {isLogin && (
                  <LoginForm
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                )}
              </Box>

              {/* Button Section */}
              <FormFooter
                isLogin={isLogin}
                palette={palette}
                setPageType={setPageType}
                resetForm={resetForm}
              />
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Form;
