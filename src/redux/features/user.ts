import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isLogin: boolean;
  isLoading: boolean;
  error: null | unknown;
};

const initialState: InitialState = {
  isLogin: false,
  isLoading: false,
  error: null,
};

export const getMyInfoFetch = createAsyncThunk('users/me', async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/users/me`, { credentials: 'include' });
  if (res.status >= 400) {
    const data = await res.json();
    throw new Error(data.message);
  }

  return res.json();
});

export const logoutFetch = createAsyncThunk('users/logout', async () =>
  fetch(`${process.env.BASE_URL}/api/users/logout`, { method: 'POST', credentials: 'include' }).then((res) =>
    res.json(),
  ),
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setIsLogin: (state, { payload }: PayloadAction<boolean>) => {
      state.isLogin = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMyInfoFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMyInfoFetch.fulfilled, (state) => {
      state.isLoading = false;
      if (state.error) state.error = null;
      state.isLogin = true;
    });
    builder.addCase(getMyInfoFetch.rejected, (state, action) => {
      state.isLoading = false;
      if (state.isLogin) state.isLogin = false;
      state.error = action.payload;
    });
    builder.addCase(logoutFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutFetch.fulfilled, (state) => {
      state.isLoading = false;
      if (state.error) state.error = null;
      state.isLogin = false;
    });
    builder.addCase(logoutFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setIsLogin } = userSlice.actions;
export default userSlice.reducer;
