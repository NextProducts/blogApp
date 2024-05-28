import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    like: (state, action) => {
      const post = state.posts[action.payload.index];
      if (!post.liked[action.payload.user]) {
        if (post.disliked[action.payload.user]) {
          delete post.disliked[action.payload.user];
        }
        post.liked[action.payload.user] = true;
      } else {
        delete post.liked[action.payload.user];
      }

      post.like = Object.keys(post.liked).length;
      post.dislike = Object.keys(post.disliked).length;
    },

    dislike: (state, action) => {
      const post = state.posts[action.payload.index];
      console.log(post);
      if (!post.disliked[action.payload.user]) {
        if (post.liked[action.payload.user]) {
          delete post.liked[action.payload.user];
        }
        post.disliked[action.payload.user] = true;
      } else {
        delete post.disliked[action.payload.user];
      }

      post.like = Object.keys(post.liked).length;
      post.dislike = Object.keys(post.disliked).length;
    },

    addComment: (state, action) => {
      const post = state.posts[action.payload.postId];
      console.log(post);
      post.comments = [
        ...post.comments,
        {
          username: action.payload.username,
          comment: action.payload.comment,
        },
      ];
    },

    newPost: (state, action) => {
      state.posts = [
        ...state.posts,
        {
          ...action.payload,
        },
      ];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const fetchPost = createAsyncThunk("post/fetch", async () => {
  const res = await axios.get("http://localhost:8000/posts");

  return res.data;
});

export const { like, dislike, addComment, newPost } = postSlice.actions;
export default postSlice.reducer;
