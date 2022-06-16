export type TableHead = {
  title: string;
  id: number;
};

export const userRecordTableHeadByRecent = [
  { id: 6, title: '날짜' },
  { id: 7, title: '시작시간' },
  { id: 8, title: '종료시간' },
  { id: 9, title: '근무시간' },
  { id: 10, title: '상태' },
  { id: 29, title: '세부현황' },
];

export const adminRecordTableHeadByUser = [
  { id: 11, title: '#' },
  { id: 12, title: '사용자' },
  { id: 13, title: '시작시간' },
  { id: 14, title: '종료시간' },
  { id: 15, title: '근무시간' },
  { id: 16, title: '상태' },
  { id: 17, title: '세부현황' },
];

export const recordTableHeadByDate = [
  { id: 18, title: '날짜' },
  { id: 19, title: '건수' },
  { id: 20, title: '평균 근무시간' },
  { id: 21, title: '총 근무 시간' },
  { id: 22, title: '세부현황' },
];
