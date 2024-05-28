import postSlice from "./features/Post/postSlice";

const { configureStore } = require("@reduxjs/toolkit");

export function createStore() {
  return configureStore({
    reducer: {
      post: postSlice,
    },
  });
}
