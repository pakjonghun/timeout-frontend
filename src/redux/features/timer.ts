import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  hour: 0,
  minute: 0,
  isWorking: false,
};

const timerSlice = createSlice({
  name: 'timerSlice',
  initialState,
  reducers: {
    setHour: (state, { payload }: PayloadAction<number>) => {
      state.hour = payload;
    },
    setMinute: (state, { payload }: PayloadAction<number>) => {
      state.minute = payload;
    },
    setIsWorking: (state, { payload }: PayloadAction<boolean>) => {
      state.isWorking = payload;
    },
    setInitTimer: () => initialState,
  },
});

export const { setInitTimer, setHour, setMinute, setIsWorking } = timerSlice.actions;
export default timerSlice.reducer;
