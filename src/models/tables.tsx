export type TableHead = {
  title: string;
  id: number;
  key: string;
  sortKey: SortType | null;
};

type SortType = 'ASC' | 'DESC' | null;
type TableKeys<K> = { id: number; key: K; title: string; sortKey: SortType };
export type UserRecordTableHeadByRecentKeys = 'date' | 'startTime' | 'endTime' | 'duration' | 'status' | 'description';

export const userRecordTableHeadByRecent: TableKeys<UserRecordTableHeadByRecentKeys>[] = [
  { id: 6, key: 'date', title: '날짜', sortKey: null },
  { id: 7, key: 'startTime', title: '시작시간', sortKey: null },
  { id: 8, key: 'endTime', title: '종료시간', sortKey: null },
  { id: 9, key: 'duration', title: '근무시간', sortKey: null },
  { id: 10, key: 'status', title: '상태', sortKey: null },
  { id: 29, key: 'description', title: '사유', sortKey: null },
];
export type AdminRecordTableHeadByUserKeys =
  | 'select'
  | 'userName'
  | 'startTime'
  | 'endTime'
  | 'duration'
  | 'status'
  | 'description'
  | 'date';

export const adminRecordTableHeadByUser: TableKeys<AdminRecordTableHeadByUserKeys>[] = [
  { id: 11, key: 'select', title: '#', sortKey: null },
  { id: 12, key: 'userName', title: '사용자', sortKey: null },
  { id: 31, key: 'date', title: '날짜', sortKey: null },
  { id: 13, key: 'startTime', title: '시작시간', sortKey: null },
  { id: 14, key: 'endTime', title: '종료시간', sortKey: null },
  { id: 15, key: 'duration', title: '근무시간', sortKey: null },
  { id: 16, key: 'status', title: '상태', sortKey: null },
  { id: 17, key: 'description', title: '사유', sortKey: null },
];

export type RecordTableHeadByDateKeys = 'date' | 'count' | 'averageDuration' | 'totalDuration';
export const recordTableHeadByDate: TableKeys<RecordTableHeadByDateKeys>[] = [
  { id: 18, key: 'date', title: '날짜', sortKey: null },
  { id: 19, key: 'count', title: '건수', sortKey: null },
  { id: 20, key: 'averageDuration', title: '평균 근무시간', sortKey: null },
  { id: 21, key: 'totalDuration', title: '총 근무 시간', sortKey: null },
];
