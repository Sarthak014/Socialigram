import {
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { LoginForm as EmailPasswordField } from "./LoginForm";

const RegisterForm = ({ values, touched, errors, handleBlur, handleChange, setFieldValue, palette }) => {
  return (
    <>
      <TextField
        label="First Name"
        name="firstName"
        type="text"
        required
        value={values.firstName}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
        helperText={touched.firstName && errors.firstName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Last Name"
        name="lastName"
        type="text"
        required
        value={values.lastName}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
        helperText={touched.lastName && errors.lastName}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Location"
        name="location"
        type="text"
        required
        value={values.location}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(touched.location) && Boolean(errors.location)}
        helperText={touched.location && errors.location}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Occupation"
        name="occupation"
        type="text"
        required
        value={values.occupation}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
        helperText={touched.occupation && errors.occupation}
        sx={{ gridColumn: "span 2" }}
      />
      <Box
        gridColumn="span 4"
        border={`1px solid ${palette.neutral.medium}`}
        borderRadius="5px"
        p="0.5rem"
      >
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              border={`1px dashed ${palette.primary.main}`}
              p="0.5rem"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!values.picture ? (
                <p style={{ margin: "0", fontSize: "0.8rem" }}>Add Profile Picture Here</p>
              ) : (
                <FlexBetween>
                  <Typography sx={{ fontSize: "0.8rem" }}>{values.picture.name}</Typography>
                  <EditOutlined />
                </FlexBetween>
              )}
            </Box>
          )}
        </Dropzone>
      </Box>
      <EmailPasswordField
        values={values}
        touched={touched}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
    </>
  );
};

export default RegisterForm;
