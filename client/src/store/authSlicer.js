import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./states/initialState";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setFriends: (state, action) => {
      if (state.user) {
        state.usr.friends = action.payload.friends;
      } else {
        console.error("User friends does not exists");
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    updatePost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });

      state.posts = updatedPost;
    },

    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  updatePost,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
