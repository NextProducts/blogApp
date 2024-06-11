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
      const username = action.payload.username;
      if (!post.likes[username]) {
        if (post.dislikes[username]) delete post.dislikes[username];
        post.likes[username] = true;
      } else {
        delete post.likes[username];
      }
    },

    dislike: (state, action) => {
      const post = state.posts[action.payload.index];
      const username = action.payload.username;
      if (!post.dislikes[username]) {
        if (post.likes[username]) delete post.likes[username];
        post.dislikes[username] = true;
      } else {
        delete post.dislikes[username];
      }
    },

    addComment: (state, action) => {
      let post = state.posts[action.payload.postId];
      const comments = post.comments;
      post.comments = [...comments, action.payload.comment];
    },

    newPost: (state, action) => {
      state.posts = [
        ...state.posts,
        {
          ...action.payload,
          comments: [],
          likes: {},
          dislikes: {},
        },
      ];
    },

    newReply: (state, action) => {
      let post = state.posts[action.payload.postId];
      const comments = post.comments;
      const index = comments.findIndex(
        (curr) => action.payload.comment.ParentCommentId == curr.comment_id
      );
      let nestedComment = post.comments[index]["nestedComment"];

      post.comments[index]["nestedComment"] = [
        ...nestedComment,
        action.payload.comment,
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
  const res = await axios.get("http://localhost:7000/post");
  return res.data;
});

export const { like, dislike, addComment, newPost, newReply } =
  postSlice.actions;
export default postSlice.reducer;
