import api from "./axios-helper";

export const loginApi = async (values) => {
  return api({
    method: "POST",
    url: "/auth/login",
    headers: { "Content-Type": "application/json" },
    data: values,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
