import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Record = {
  id: number;
  endTime: Date;
  startTime: Date;
  duration: number;
};

type WorkingList = {
  id: number;
  role: 'Client' | 'Manager';
  name: string;
  email: string;
  phone: string;
  listCount: number;
  count: number;
  recordList: Record[];
};

type DoneList = {
  sumDuration: number;
} & WorkingList;

type InitialState = {
  workingUserList: WorkingList[];
  doneUserList: DoneList[];
};

const initialState: InitialState = {
  workingUserList: [],
  doneUserList: [],
};

const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    setWorkingUserList: (state, { payload }: PayloadAction<WorkingList[]>) => {
      state.workingUserList = payload;
    },
    setDoneUserList: (state, { payload }: PayloadAction<DoneList[]>) => {
      state.doneUserList = payload;
    },
  },
});

export const { setDoneUserList, setWorkingUserList } = adminSlice.actions;
export default adminSlice.reducer;
