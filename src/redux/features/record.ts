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
    page: number;
    perPage: number;
    selectedItemList: number[];
  };

  adminRecordTableHeadByUser: {
    thead: typeof adminRecordTableHeadByUser;
    page: number;
    perPage: number;
    selectedItemList: number[];
  };

  recordTableHeadByDate: {
    thead: typeof recordTableHeadByDate;
    page: number;
    perPage: number;
    selectedItemList: number[];
  };
};

const initialState: InitialState = {
  userRecordTableHeadByRecent: {
    thead: userRecordTableHeadByRecent,
    page: 1,
    perPage: 10,
    selectedItemList: [],
  },
  adminRecordTableHeadByUser: {
    thead: adminRecordTableHeadByUser,
    page: 1,
    perPage: 10,
    selectedItemList: [],
  },
  recordTableHeadByDate: {
    thead: recordTableHeadByDate,
    page: 1,
    perPage: 10,
    selectedItemList: [],
  },
};

const recordSlice = createSlice({
  name: 'recordSlice',
  initialState,
  reducers: {
    addUserRecordTableHeadByRecentSelectedItem: (state, { payload }: PayloadAction<number>) => {
      if (!state.userRecordTableHeadByRecent.selectedItemList.some((id) => id === payload)) {
        state.userRecordTableHeadByRecent.selectedItemList.push(payload);
      }
    },

    addAdminRecordTableHeadByUserSelectedItem: (state, { payload }: PayloadAction<number>) => {
      if (!state.adminRecordTableHeadByUser.selectedItemList.some((id) => id === payload)) {
        state.adminRecordTableHeadByUser.selectedItemList.push(payload);
      }
    },

    addrecordTableHeadByDateSelectedItem: (state, { payload }: PayloadAction<number>) => {
      if (!state.recordTableHeadByDate.selectedItemList.some((id) => id === payload)) {
        state.recordTableHeadByDate.selectedItemList.push(payload);
      }
    },

    deleteUserRecordTableHeadByRecentSelectedItem: (state, { payload }: PayloadAction<number>) => {
      state.userRecordTableHeadByRecent.selectedItemList = state.userRecordTableHeadByRecent.selectedItemList.filter(
        (id) => id !== payload,
      );
    },

    deleteAdminRecordTableHeadByUserSelectedItem: (state, { payload }: PayloadAction<number>) => {
      state.adminRecordTableHeadByUser.selectedItemList = state.userRecordTableHeadByRecent.selectedItemList.filter(
        (id) => id !== payload,
      );
    },

    deleteRecordTableHeadByDateSelectedItem: (state, { payload }: PayloadAction<number>) => {
      state.recordTableHeadByDate.selectedItemList = state.userRecordTableHeadByRecent.selectedItemList.filter(
        (id) => id !== payload,
      );
    },

    setSortUserRecordTableHeadByRecent: (state, { payload }: PayloadAction<UserRecordTableHeadByRecentKeys>) => {
      const thead = [...state.userRecordTableHeadByRecent.thead];
      thead.forEach((v) => {
        if (v.key == payload) {
          const nextSortKey = v.sortKey == 'ASC' ? 'DESC' : 'ASC';
          v.sortKey = nextSortKey;
        } else {
          v.sortKey = null;
        }
      });

      state.userRecordTableHeadByRecent.thead = thead;
    },

    setSortAdminRecordTableHeadByUser: (state, { payload }: PayloadAction<AdminRecordTableHeadByUserKeys>) => {
      const thead = [...state.adminRecordTableHeadByUser.thead];
      thead.forEach((v) => {
        if (v.key == payload) {
          const nextSortKey = v.sortKey == 'ASC' ? 'DESC' : 'ASC';
          v.sortKey = nextSortKey;
        } else {
          v.sortKey = null;
        }
      });

      state.adminRecordTableHeadByUser.thead = thead;
    },

    setSortRecordTableHeadByDate: (state, { payload }: PayloadAction<RecordTableHeadByDateKeys>) => {
      const thead = [...state.recordTableHeadByDate.thead];
      thead.forEach((v) => {
        if (v.key == payload) {
          const nextSortKey = v.sortKey == 'ASC' ? 'DESC' : 'ASC';
          v.sortKey = nextSortKey;
        } else {
          v.sortKey = null;
        }
      });

      state.recordTableHeadByDate.thead = thead;
    },
  },
});
export const {
  addUserRecordTableHeadByRecentSelectedItem,
  addAdminRecordTableHeadByUserSelectedItem,
  addrecordTableHeadByDateSelectedItem,
  deleteUserRecordTableHeadByRecentSelectedItem,
  deleteAdminRecordTableHeadByUserSelectedItem,
  deleteRecordTableHeadByDateSelectedItem,
  setSortUserRecordTableHeadByRecent,
  setSortAdminRecordTableHeadByUser,
  setSortRecordTableHeadByDate,
} = recordSlice.actions;

export default recordSlice.reducer;
