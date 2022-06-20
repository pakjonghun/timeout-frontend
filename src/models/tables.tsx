export const perCursor = 3;

export type TableHead = {
  title: string;
  id: number;
  key: string;
};

type TableKeys<K> = { id: number; key: K; title: string };
export type UserRecordTableHeadByRecentKeys = 'date' | 'startTime' | 'endTime' | 'duration' | 'status';

export const userRecordTableHeadByRecent: TableKeys<UserRecordTableHeadByRecentKeys>[] = [
  { id: 6, key: 'date', title: '날짜' },
  { id: 7, key: 'startTime', title: '시작시간' },
  { id: 8, key: 'endTime', title: '종료시간' },
  { id: 9, key: 'duration', title: '근무시간' },
  { id: 10, key: 'status', title: '상태' },
];
export type AdminRecordTableHeadByUserKeys =
  | 'select'
  | 'userName'
  | 'startTime'
  | 'endTime'
  | 'duration'
  | 'status'
  | 'date'
  | 'admin';

export const adminRecordTableHeadByUser: TableKeys<AdminRecordTableHeadByUserKeys>[] = [
  { id: 11, key: 'select', title: '#' },
  { id: 12, key: 'userName', title: '사용자' },
  { id: 31, key: 'date', title: '날짜' },
  { id: 13, key: 'startTime', title: '시작시간' },
  { id: 14, key: 'endTime', title: '종료시간' },
  { id: 15, key: 'duration', title: '근무시간' },
  { id: 16, key: 'status', title: '상태' },
  { id: 32, key: 'admin', title: '관리' },
];
