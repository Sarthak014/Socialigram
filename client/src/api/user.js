import api from "./axios-helper";

export const fetchUserData = async (id, token) => {
  return api({
    method: "GET",
    url: `/users/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log('response is ', res);
      return res.data;
    })
    .catch((err) => {
      console.log("in catch, error is: ", err);
      console.error(err);
      return err;
    });
};
