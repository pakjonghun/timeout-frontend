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
    isAllSelected: boolean;
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
    isAllSelected: false,
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
    toggleAdminRecordTableHeadByUserSelectedItem: (state, { payload }: PayloadAction<number>) => {
      if (!state.adminRecordTableHeadByUser.selectedItemList.some((id) => id === payload)) {
        state.adminRecordTableHeadByUser.selectedItemList.push(payload);
      } else {
        state.adminRecordTableHeadByUser.selectedItemList = state.adminRecordTableHeadByUser.selectedItemList.filter(
          (id) => id !== payload,
        );
      }
    },

    setAdminRecordTableHeadByUserIsAllSelected: (state, { payload }: PayloadAction<{ idList: number[] }>) => {
      const selectedList = state.adminRecordTableHeadByUser.selectedItemList;

      let isAllSelected = true;
      for (const id of payload.idList) {
        const index = selectedList.indexOf(id);
        if (index < 0) {
          isAllSelected = false;
          break;
        }
      }

      state.adminRecordTableHeadByUser.isAllSelected = isAllSelected;
    },

    toggleAdminRecordTableHeadByUserSelectedItemList: (
      state,
      { payload }: PayloadAction<{ idList: number[]; checked: boolean }>,
    ) => {
      const selectedList = state.adminRecordTableHeadByUser.selectedItemList;

      for (const id of payload.idList) {
        const index = selectedList.indexOf(id);
        if (payload.checked) {
          if (index < 0) selectedList.push(id);
        } else {
          if (index >= 0) selectedList.splice(index, 1);
        }
      }

      state.adminRecordTableHeadByUser.selectedItemList = selectedList;
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
      state.userRecordTableHeadByRecent = { ...initialState.userRecordTableHeadByRecent };
      state.userRecordTableHeadByRecent.sort = { sortKey: payload, sortValue: nextSortValue };
    },

    setSortAdminRecordTableHeadByUser: (state, { payload }: PayloadAction<AdminRecordTableHeadByUserKeys>) => {
      const { sortValue } = state.adminRecordTableHeadByUser.sort;
      const nextSortValue = sortValue == 'ASC' ? 'DESC' : 'ASC';
      state.adminRecordTableHeadByUser = { ...initialState.adminRecordTableHeadByUser };
      state.adminRecordTableHeadByUser.sort = { sortKey: payload, sortValue: nextSortValue };
    },

    setSortRecordTableHeadByDate: (state, { payload }: PayloadAction<RecordTableHeadByDateKeys>) => {
      const { sortValue } = state.recordTableHeadByDate.sort;
      const nextSortValue = sortValue == 'ASC' ? 'DESC' : 'ASC';
      state.recordTableHeadByDate = { ...initialState.recordTableHeadByDate };
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
  toggleAdminRecordTableHeadByUserSelectedItem,
  toggleAdminRecordTableHeadByUserSelectedItemList,
  setSortUserRecordTableHeadByRecent,
  setSortAdminRecordTableHeadByUser,
  setSortRecordTableHeadByDate,
  setCursorUserRecordTableHeadByRecent,
  setCursorAdminRecordTableHeadByUser,
  setCursorRecordTableHeadByDate,
  setAdminRecordTableHeadByUserIsAllSelected,
} = recordSlice.actions;

export default recordSlice.reducer;
