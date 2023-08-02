import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import NavbarBrand from "./presentation/NavbarBrand";
import DesktopViewNavItems from "./presentation/DesktopViewNavItems";
import MobileViewNavItems from "./presentation/MobileViewNavItems";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  // const user = { firstName: "Sarthak", lastName: "Agarwal"};

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <NavbarBrand
          primaryLight={primaryLight}
          neutralLight={neutralLight}
          isNonMobileScreens={isNonMobileScreens}
        />
        {isNonMobileScreens ? (
          // MOBILE NAV ITEMS VIEW
          <DesktopViewNavItems
            mode={theme.palette.mode}
            fullName={fullName}
            neutralLight={neutralLight}
            dark={dark}
          />
        ) : (
          // MOBILE NAV ITEMS VIEW
          <MobileViewNavItems
            mode={theme.palette.mode}
            fullName={fullName}
            neutralLight={neutralLight}
            background={background}
            dark={dark}
            isMobileMenuToggled={isMobileMenuToggled}
            setIsMobileMenuToggled={setIsMobileMenuToggled}
            picturePath={user.picturePath}
            userId={user._id}
          />
        )
        }
      </FlexBetween>
    </>
  );
};

export default Navbar;
