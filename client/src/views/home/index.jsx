import { Box } from "@mui/material";
import Navbar from "views/navbar";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserProfile from "views/widgets/UserProfile";
import CreatePost from "views/widgets/CreatePost";
import Loader from "components/Loader";
import Notification from "components/NotificationBar";

const Home = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Loader height={"100vh"} />
        <Box>
          <Navbar />
          <Box
            display={isNonMobileScreen ? "flex" : "block"}
            padding="2rem 6%"
            gap="0.5rem"
            justifyContent="space-between"
            width="100%"
          >
            <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
              <UserProfile userId={_id} picturePath={picturePath} />
            </Box>
            <Box
              flexBasis={isNonMobileScreen ? "42%" : undefined}
              mt={isNonMobileScreen ? undefined : "2rem"}
            >
              <CreatePost picturePath={picturePath} />
            </Box>
            {isNonMobileScreen && <Box flexBasis="26%"></Box>}
          </Box>
          <Notification />
        </Box>
      </Box>
    </>
  );
};

export default Home;
