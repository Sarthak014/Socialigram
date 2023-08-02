import {
  Box,
  IconButton,
  MenuItem,
  Typography,
  Tooltip,
  Menu,
  Divider,
} from "@mui/material";
import {
  DarkMode,
  HelpOutline,
  LightMode,
  Message,
  AccountCircle,
  Logout,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMode, setLogout } from "store/authSlicer";
import { useState } from "react";
import UserIamge from "components/UserImage";

const MobileViewNavItems = ({
  mode,
  fullName,
  neutralLight,
  background,
  dark,
  isMobileMenuToggled,
  setIsMobileMenuToggled,
  picturePath,
  userId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Data
  const [anchorElUser, setAnchorElUser] = useState(null);
  const iconSize = { fontSize: "16px" };
  const menuItemPadding = { pl: "0.35rem" };

  // Methods
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setIsMobileMenuToggled(!isMobileMenuToggled);
  };

  return (
    <Box backgroundColor={background} sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {picturePath ? (
            <UserIamge size="40px" image={picturePath} />
          ) : (
            <AccountCircle sx={{ fontSize: "1.5rem" }} alt="Profile" />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          mt: "30px",
          "& .MuiMenu-paper .MuiMenu-list": {
            pl: "0.3rem",
            pr: "0.3rem",

            "& .MuiMenuItem-root:hover": {
              backgroundColor: neutralLight,
            }
          },
        }}
        anchorEl={anchorElUser}
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuToggled && Boolean(anchorElUser)}
        onClose={handleOpenUserMenu}
      >
        <MenuItem>
          <Typography onClick={() => navigate(`/profile/${userId}`)}>{fullName}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <NotificationsNoneOutlined sx={iconSize} />
          <Typography sx={menuItemPadding}>Notifications</Typography>
        </MenuItem>
        <MenuItem>
          <Message sx={iconSize} />
          <Typography sx={menuItemPadding}>Messages</Typography>
        </MenuItem>
        <MenuItem>
          <HelpOutline sx={iconSize} />
          <Typography sx={menuItemPadding}>Support</Typography>
        </MenuItem>
        <MenuItem onClick={() => dispatch(setMode())}>
          <IconButton sx={{ p: "0", ...iconSize }}>
            {mode === "dark" ? (
              <DarkMode sx={iconSize} />
            ) : (
              <LightMode sx={{ color: dark, ...iconSize }} />
            )}
          </IconButton>
          <Typography sx={menuItemPadding}>Change Mode</Typography>
        </MenuItem>
        <MenuItem onClick={() => dispatch(setLogout())}>
          <Logout sx={iconSize} />
          <Typography sx={menuItemPadding}>Log Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MobileViewNavItems;
