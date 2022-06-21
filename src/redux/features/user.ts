import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  previewImage: string;
  resizeUrl: string;
  originUrl: string;
};

const initialState: InitialState = {
  previewImage: '',
  resizeUrl: '',
  originUrl: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setPreviewImage: (state, { payload }: PayloadAction<string>) => {
      state.previewImage = payload;
    },
    setResizeUrl: (state, { payload }: PayloadAction<string>) => {
      state.resizeUrl = payload;
    },
    setOriginUrl: (state, { payload }: PayloadAction<string>) => {
      state.originUrl = payload;
    },
  },
});

export const { setResizeUrl, setOriginUrl, setPreviewImage } = userSlice.actions;
export default userSlice.reducer;
