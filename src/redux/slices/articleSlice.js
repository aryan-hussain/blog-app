import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await fetch('https://api.example.com/articles');
    return response.json();
  }
);

export const fetchSingleArticle = createAsyncThunk(
  'articles/fetchSingleArticle',
  async (id) => {
    const response = await fetch(`https://api.example.com/articles/${id}`);
    return response.json();
  }
);

export const createNewPost = createAsyncThunk(
  'articles/createNewPost',
  async (postData) => {
    const response = await fetch('https://api.example.com/articles', {
      method: 'POST',
      body: postData,
    });
    return response.json();
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ id, formData }) => {
    const response = await fetch(`https://api.example.com/articles/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return response.json();
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    latestPost: null,
    currentArticle: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
        state.latestPost = action.payload[0]; // Assuming the first article is the latest
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSingleArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentArticle = action.payload;
      })
      .addCase(fetchSingleArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles.unshift(action.payload);
        state.latestPost = action.payload;
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateArticle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        state.currentArticle = action.payload;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default articlesSlice.reducer;