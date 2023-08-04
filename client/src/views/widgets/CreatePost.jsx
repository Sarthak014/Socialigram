import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import {
  DeleteOutlined,
  EditOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading, updateNotification } from "store/authSlicer";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import UserIamge from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { createPost } from "api/createPost";

const CreatePost = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  // Theme Color
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;
  const main = palette.primary.main;
  const alt = palette.background.alt;

  // Methods
  function resetPost() {
    setImage(null);
    setPost("");
  }

  async function handlePost() {
    await dispatch(setLoading({ loading: true }));

    const response = await createPost(_id, post, image, token);

    if (response && !response?.error) {
      await dispatch(setPosts({ response }));
      dispatch(updateNotification({ show: true, message: "Feed Created" }));
    } else {
      dispatch(
        updateNotification({ show: true, message: "Couldn't Post Feed" })
      );
    }

    await dispatch(setLoading({ loading: false }));

    resetPost();
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserIamge image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
          sx={{
            width: "100%",
            backgroundColor: light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          sx={{
            border: `1px solid ${medium}`,
            borderRadius: "5px",
            marginTop: "1rem",
            padding: "1rem",
          }}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`1px dashed ${palette.primary.main}`}
                  p="0.5rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p style={{ margin: "0", fontSize: "0.8rem" }}>Add Image</p>
                  ) : (
                    <FlexBetween>
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {image.name}
                      </Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    sx={{ width: "15%" }}
                    onClick={() => setImage(null)}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap="0.25rem"
          alignItems="center"
          onClick={() => setIsImage(!isImage)}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            sx={{
              color: mediumMain,
              "&:hover": { cursor: "pointer", color: medium },
            }}
          >
            Image
          </Typography>
        </FlexBetween>

        <Button
          disabled={!post || !image}
          onClick={handlePost}
          sx={{
            color: alt,
            backgroundColor: main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default CreatePost;
