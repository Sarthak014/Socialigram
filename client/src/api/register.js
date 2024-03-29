import api from "./axios-helper";

export const registerApi = async (values) => {
  // this allows us to send the form data along with image data
  const formData = new FormData();

  for (let formValue in values) {
    formData.append(formValue, values[formValue]);
  }

  formData.append("picturePath", values.picture.name);

  return api({
    method: "POST",
    url: "/auth/register",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
  })
    .then((res) => {
      return res.data;
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
        console.error('Error', error.message);
      }
      console.error(error.config);
    });
};
