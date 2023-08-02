import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { fetchUserData } from "api/user";
import FlexBetween from "components/FlexBetween";
import UserIamge from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "store/authSlicer";

const UserProfile = ({ userId, picturePath }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);

  // Theme
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // Method
  const getUser = async () => {
    const response = await fetchUserData(userId, token);
    if (response && !response?.error) setUser(response);
  };

  // Hooks
  useEffect(() => {
    dispatch(
      setLoading({
        loading: true,
      })
    );
    getUser();

    dispatch(
      setLoading({
        loading: false,
      })
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user){
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    user && (
      <WidgetWrapper>
        {/* First Row - Profile Picture and Friends/Follwers Count */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserIamge image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName + " " + lastName}
              </Typography>
              <Typography
                color={medium}
              >{`${friends.length ? friends.length : 0} friends`}</Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined sx={{ cursor: "pointer" }} />
        </FlexBetween>

        <Divider />

        {/* Second Row - Location and Occupation */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>

        <Divider />

        {/* Third Row - Profile Viewed and Impressions */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Profile Viewed</Typography>
            <Typography color={main}>{viewedProfile}</Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>Impressions</Typography>
            <Typography color={main}>{impressions}</Typography>
          </FlexBetween>
        </Box>

        <Divider />

        {/* Fourth Row - Social Networks */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../../assets/twitter.png" alt="twitter" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main, cursor: "pointer" }} />
          </FlexBetween>

          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <img src="../../assets/linkedin.png" alt="linkedin" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main, cursor: "pointer" }} />
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    )
  );
};

export default UserProfile;
