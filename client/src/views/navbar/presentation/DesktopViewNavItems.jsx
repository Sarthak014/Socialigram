import {
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "store/authSlicer";
import FlexBetween from "components/FlexBetween";
import {
  DarkMode,
  Help,
  LightMode,
  Message,
  Notifications,
  Logout,
} from "@mui/icons-material";

const DesktopViewNavItems = ({ mode, fullName, neutralLight, dark }) => {
  const dispatch = useDispatch();

  const fontSize = { fontSize: "22px" };

  return (
    <FlexBetween gap="2rem">
      <IconButton onClick={() => dispatch(setMode())}>
        {mode === "dark" ? (
          <DarkMode sx={fontSize} />
        ) : (
          <LightMode sx={{ color: dark, ...fontSize }} />
        )}
      </IconButton>
      <Message sx={fontSize} />
      <Notifications sx={fontSize} />
      <Help sx={fontSize} />
      <FormControl variant="standard" value={fullName}>
        <Select
          value={fullName}
          sx={{
            backgroundColor: neutralLight,
            minWidth: "150px",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: neutralLight,
            },
          }}
          input={<InputBase />}
        >
          <MenuItem value={fullName}>
            {/* TODO: Fix the display */}
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={() => dispatch(setLogout())}>
            <Logout sx={fontSize} />
            <Typography sx={{ pl: "0.25rem" }}>Log Out</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </FlexBetween>
  );
};

export default DesktopViewNavItems;
