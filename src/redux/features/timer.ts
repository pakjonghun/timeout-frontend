import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timerSlice',
  initialState: {
    hour: 0,
    minute: 0,
    isWorking: false,
  },
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
  },
});

export const { setHour, setMinute, setIsWorking } = timerSlice.actions;
export default timerSlice.reducer;
