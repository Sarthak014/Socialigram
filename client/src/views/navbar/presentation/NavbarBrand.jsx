import { IconButton, InputBase, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const NavbarBrand = ({ primaryLight, neutralLight, isNonMobileScreen }) => {
  const navigate = useNavigate();

  const navigatToHome = () => navigate("/home");

  return (
    <FlexBetween gap="1.75rem">
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary"
        onClick={navigatToHome}
        sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer",
          },
        }}
      >
        Socialigram
      </Typography>
      {isNonMobileScreen && (
        <FlexBetween
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
      )}
    </FlexBetween>
  );
};

export default NavbarBrand;
