export interface record {
  id: number;
  startTime: Date;
  endTime: Date | null;
  duration: number;
  status: 'working' | 'done' | 'nothing';
  description: string | null;
}

interface user {
  id: number;
  name: string;
}

export type recordWithUser = {
  id: number;
  startTime: Date;
  endTime: Date | null;
  description: string | null;
  duration: number;
  status: 'working' | 'done' | 'nothing';
  user: user;
};

export interface getRecordsQuery {
  sortKey: string | null;
  sortValue: 'ASC' | 'DESC' | null;
  page: number;
  perPage: number;
}

export interface getRecordsResponse {
  data: record[];
  message: string;
  totalCount: number;
  totalPage: number;
  user?: user;
}
