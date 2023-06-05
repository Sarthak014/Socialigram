export const routePath = {
  // auth routes
  userRegistration: "/register",
  userLogin: "/login",

  // user related routes
  home: "/:id",
  userFriends: "/:id/friends",
  updateUserFriend: "/:id/:friendId",

  // posts or feed
  getUserPost: "/:id/posts",
  likeUserPost: "/:id/like",
};
