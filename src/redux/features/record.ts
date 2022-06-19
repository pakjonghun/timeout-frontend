import {
  AdminRecordTableHeadByUserKeys,
  RecordTableHeadByDateKeys,
  UserRecordTableHeadByRecentKeys,
} from './../../models/tables';
import { userRecordTableHeadByRecent, adminRecordTableHeadByUser, recordTableHeadByDate } from '@models/tables';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  userRecordTableHeadByRecent: {
    thead: typeof userRecordTableHeadByRecent;
    sort: { sortKey: UserRecordTableHeadByRecentKeys | null; sortValue: 'ASC' | 'DESC' | null };
    cursor: number;
    page: number;
    perPage: number;
  };

  adminRecordTableHeadByUser: {
    thead: typeof adminRecordTableHeadByUser;
    sort: { sortKey: AdminRecordTableHeadByUserKeys | null; sortValue: 'ASC' | 'DESC' | null };
    selectedItemList: number[];
    cursor: number;
    page: number;
    perPage: number;
  };

  recordTableHeadByDate: {
    thead: typeof recordTableHeadByDate;
    sort: { sortKey: RecordTableHeadByDateKeys | null; sortValue: 'ASC' | 'DESC' | null };
    cursor: number;
    page: number;
    perPage: number;
  };
};

const initialState: InitialState = {
  userRecordTableHeadByRecent: {
    thead: userRecordTableHeadByRecent,
    sort: { sortKey: null, sortValue: null },
    cursor: 1,
    page: 1,
    perPage: 13,
  },
  adminRecordTableHeadByUser: {
    thead: adminRecordTableHeadByUser,
    sort: { sortKey: null, sortValue: null },
    selectedItemList: [],
    cursor: 1,
    page: 1,
    perPage: 13,
  },
  recordTableHeadByDate: {
    thead: recordTableHeadByDate,
    sort: { sortKey: null, sortValue: null },
    cursor: 1,
    page: 1,
    perPage: 13,
  },
};

const recordSlice = createSlice({
  name: 'recordSlice',
  initialState,
  reducers: {
    addAdminRecordTableHeadByUserSelectedItem: (state, { payload }: PayloadAction<number>) => {
      if (!state.adminRecordTableHeadByUser.selectedItemList.some((id) => id === payload)) {
        state.adminRecordTableHeadByUser.selectedItemList.push(payload);
      }
    },

    deleteAdminRecordTableHeadByUserSelectedItem: (state, { payload }: PayloadAction<number>) => {
      state.adminRecordTableHeadByUser.selectedItemList = state.adminRecordTableHeadByUser.selectedItemList.filter(
        (id) => id !== payload,
      );
    },

    setPageUserRecordTableHeadByRecent: (state, { payload }: PayloadAction<number>) => {
      state.userRecordTableHeadByRecent.page = payload;
    },

    setPageAdminRecordTableHeadByUser: (state, { payload }: PayloadAction<number>) => {
      state.adminRecordTableHeadByUser.page = payload;
    },

    setPageRecordTableHeadByDate: (state, { payload }: PayloadAction<number>) => {
      state.recordTableHeadByDate.page = payload;
    },

    setSortUserRecordTableHeadByRecent: (state, { payload }: PayloadAction<UserRecordTableHeadByRecentKeys>) => {
      const { sortValue } = state.userRecordTableHeadByRecent.sort;
      const nextSortValue = sortValue == 'ASC' ? 'DESC' : 'ASC';
      state.userRecordTableHeadByRecent.sort = { sortKey: payload, sortValue: nextSortValue };
    },

    setSortAdminRecordTableHeadByUser: (state, { payload }: PayloadAction<AdminRecordTableHeadByUserKeys>) => {
      const { sortValue } = state.adminRecordTableHeadByUser.sort;
      const nextSortValue = sortValue == 'ASC' ? 'DESC' : 'ASC';
      state.adminRecordTableHeadByUser.sort = { sortKey: payload, sortValue: nextSortValue };
    },

    setSortRecordTableHeadByDate: (state, { payload }: PayloadAction<RecordTableHeadByDateKeys>) => {
      const { sortValue } = state.recordTableHeadByDate.sort;
      const nextSortValue = sortValue == 'ASC' ? 'DESC' : 'ASC';
      state.recordTableHeadByDate.sort = { sortKey: payload, sortValue: nextSortValue };
    },

    setCursorUserRecordTableHeadByRecent: (state, { payload }: PayloadAction<number>) => {
      state.userRecordTableHeadByRecent.cursor = payload;
    },

    setCursorAdminRecordTableHeadByUser: (state, { payload }: PayloadAction<number>) => {
      state.adminRecordTableHeadByUser.cursor = payload;
    },

    setCursorRecordTableHeadByDate: (state, { payload }: PayloadAction<number>) => {
      state.recordTableHeadByDate.cursor = payload;
    },
  },
});
export const {
  setPageUserRecordTableHeadByRecent,
  setPageAdminRecordTableHeadByUser,
  setPageRecordTableHeadByDate,
  addAdminRecordTableHeadByUserSelectedItem,
  deleteAdminRecordTableHeadByUserSelectedItem,
  setSortUserRecordTableHeadByRecent,
  setSortAdminRecordTableHeadByUser,
  setSortRecordTableHeadByDate,
  setCursorUserRecordTableHeadByRecent,
  setCursorAdminRecordTableHeadByUser,
  setCursorRecordTableHeadByDate,
} = recordSlice.actions;

export default recordSlice.reducer;
