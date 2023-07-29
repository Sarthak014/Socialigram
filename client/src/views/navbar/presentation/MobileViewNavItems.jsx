import {
  Box,
  IconButton,
  MenuItem,
  Typography,
  Tooltip,
  Menu,
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
import { setMode, setLogout } from "store/authSlicer";
import { useState } from "react";

const MobileViewNavItems = ({
  mode,
  fullName,
  neutralLight,
  background,
  dark,
  isMobileMenuToggled,
  setIsMobileMenuToggled,
}) => {
  const dispatch = useDispatch();

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
    <Box
      backgroundColor={background}
      sx={{ flexGrow: 0 }}
    >
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          <AccountCircle sx={{ fontSize: "1.5rem" }} alt={fullName} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          mt: '30px',
          "& .MuiMenu-paper .MuiMenu-list": {
            pl: "0.5rem",
            pr: "0.5rem",
          },
        }}
        anchorEl={anchorElUser}
        id="menu-appbar"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuToggled && Boolean(anchorElUser)}
        onClose={handleOpenUserMenu}
      >
        <MenuItem>
          <Typography>{fullName}</Typography>
        </MenuItem>
        <MenuItem>
          <NotificationsNoneOutlined sx={iconSize} />
          <Typography sx={ menuItemPadding }>Notifications</Typography>
        </MenuItem>
        <MenuItem>
          <Message sx={iconSize} />
          <Typography sx={ menuItemPadding }>Messages</Typography>
        </MenuItem>
        <MenuItem>
          <HelpOutline sx={iconSize} />
          <Typography sx={ menuItemPadding }>Support</Typography>
        </MenuItem>
        <MenuItem onClick={() => dispatch(setMode())}>
          <IconButton sx={{ p: "0", ...iconSize }}>
            {mode === "dark" ? (
              <DarkMode sx={ iconSize } />
            ) : (
              <LightMode sx={{ color: dark, ...iconSize }} />
            )}
          </IconButton>
          <Typography sx={ menuItemPadding }>Change Mode</Typography>
        </MenuItem>
        <MenuItem onClick={() => dispatch(setLogout())}>
          <Logout sx={iconSize} />
          <Typography sx={ menuItemPadding }>Log Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MobileViewNavItems;
