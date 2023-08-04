import api from "./axios-helper";
import { fetchAllPost } from "./fetchAllPost";

export const createPost = async (id, post, image, token) => {
  const formData = new FormData();

  formData.append("userId", id);
  formData.append("description", post);

  if (image) {
    formData.append("picture", image);
    formData.append("picturePath", image.name);
  }

  return api({
    method: "POST",
    url: "/posts/create",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  })
    .then(async (res) => {
      if (res.data === "success") {
        const posts = await fetchAllPost(token);
        return posts;
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
      console.error(error.config);
    });
};
