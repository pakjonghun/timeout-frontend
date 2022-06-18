export interface record {
  id: number;
  startTime: Date;
  endTime: Date | null;
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
  user: user;
};

export interface getRecordsQuery {
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
