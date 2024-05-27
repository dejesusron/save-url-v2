import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import linkService from './linkService';

const initialState = {
  links: [],
  link: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// create a new link
export const createLink = createAsyncThunk(
  'links/create',
  async (linkData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await linkService.createLink(linkData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user links
export const getLinks = createAsyncThunk(
  'links/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await linkService.getLinks(token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get user link
export const getLink = createAsyncThunk(
  'links/getLink',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await linkService.getLink(id, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete link
export const deleteLink = createAsyncThunk(
  'links/deleteLink',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await linkService.deleteLink(id, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.links.push(action.payload);
      })
      .addCase(createLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLinks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.links = action.payload;
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLink.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.link = action.payload;
      })
      .addCase(getLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.links = state.links.filter(
          (link) => link._id !== action.payload.id
        );
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = linkSlice.actions;
export default linkSlice.reducer;
