import { AdminRecordTableHeadByUserKeys, UserRecordTableHeadByRecentKeys } from './../../models/tables';
import { userRecordTableHeadByRecent, adminRecordTableHeadByUser } from '@models/tables';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isRefetch: number;
  isSearch: boolean;
  userRecordTableHeadByRecent: {
    thead: typeof userRecordTableHeadByRecent;
    sort: { sortKey: UserRecordTableHeadByRecentKeys | null; sortValue: 'ASC' | 'DESC' | null };
    cursor: number;
    page: number;
    perPage: number;
    startDate: null | string;
    endDate: null | string;
    searchTerm: null | string;
  };

  adminRecordTableHeadByUser: {
    thead: typeof adminRecordTableHeadByUser;
    sort: { sortKey: AdminRecordTableHeadByUserKeys | null; sortValue: 'ASC' | 'DESC' | null };
    selectedItemList: number[];
    cursor: number;
    page: number;
    perPage: number;
    isAllSelected: boolean;
    openedItemId: number | null;
    startDate: null | string;
    endDate: null | string;
    searchTerm: null | string;
  };
};

const initialState: InitialState = {
  isRefetch: 0,
  isSearch: false,
  userRecordTableHeadByRecent: {
    thead: userRecordTableHeadByRecent,
    sort: { sortKey: null, sortValue: null },
    cursor: 1,
    page: 1,
    perPage: 13,
    startDate: null,
    endDate: null,
    searchTerm: null,
  },
  adminRecordTableHeadByUser: {
    thead: adminRecordTableHeadByUser,
    sort: { sortKey: null, sortValue: null },
    selectedItemList: [],
    cursor: 1,
    page: 1,
    perPage: 13,
    isAllSelected: false,
    openedItemId: null,
    startDate: null,
    endDate: null,
    searchTerm: null,
  },
};

const recordSlice = createSlice({
  name: 'recordSlice',
  initialState,
  reducers: {
    setIsRefetch: (state, { payload }: PayloadAction<number>) => {
      state.isRefetch = payload;
    },
    setAdminSearchTerm: (state, { payload }: PayloadAction<string | null>) => {
      state.adminRecordTableHeadByUser.searchTerm = payload;
    },
    setUserSearchTerm: (state, { payload }: PayloadAction<string | null>) => {
      state.userRecordTableHeadByRecent.searchTerm = payload;
    },
    setAdminStartDate: (state, { payload }: PayloadAction<string | null>) => {
      state.adminRecordTableHeadByUser.startDate = payload;
    },
    setUserStartDate: (state, { payload }: PayloadAction<string | null>) => {
      state.userRecordTableHeadByRecent.startDate = payload;
    },
    setAdminEndtDate: (state, { payload }: PayloadAction<string | null>) => {
      state.adminRecordTableHeadByUser.endDate = payload;
    },
    setUserEndtDate: (state, { payload }: PayloadAction<string | null>) => {
      state.userRecordTableHeadByRecent.endDate = payload;
    },
    toggleAdminOpenedItem: (state, { payload }: PayloadAction<number>) => {
      if (state.adminRecordTableHeadByUser.openedItemId === payload) {
        state.adminRecordTableHeadByUser.openedItemId = null;
      } else {
        state.adminRecordTableHeadByUser.openedItemId = payload;
      }
    },
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
      if (!payload.idList.length) {
        state.adminRecordTableHeadByUser.isAllSelected = false;
        return;
      }

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

    setCursorUserRecordTableHeadByRecent: (state, { payload }: PayloadAction<number>) => {
      state.userRecordTableHeadByRecent.cursor = payload;
    },

    setCursorAdminRecordTableHeadByUser: (state, { payload }: PayloadAction<number>) => {
      state.adminRecordTableHeadByUser.cursor = payload;
    },
  },
});
export const {
  setIsRefetch,
  setAdminEndtDate,
  setAdminSearchTerm,
  setAdminStartDate,
  setUserEndtDate,
  setUserStartDate,
  setUserSearchTerm,
  toggleAdminOpenedItem,
  setPageUserRecordTableHeadByRecent,
  setPageAdminRecordTableHeadByUser,
  toggleAdminRecordTableHeadByUserSelectedItem,
  toggleAdminRecordTableHeadByUserSelectedItemList,
  setSortUserRecordTableHeadByRecent,
  setSortAdminRecordTableHeadByUser,
  setCursorUserRecordTableHeadByRecent,
  setCursorAdminRecordTableHeadByUser,
  setAdminRecordTableHeadByUserIsAllSelected,
} = recordSlice.actions;

export default recordSlice.reducer;
