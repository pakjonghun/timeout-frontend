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
  startDate: null | string;
  endDate: null | string;
  searchTerm: null | string;
}

export interface getRecordsResponse {
  data: record[];
  message: string;
  totalCount: number;
  totalPage: number;
  user?: user;
}

export interface adminEditRecordRequest {
  startTime?: Date;
  endTime?: Date;
  description?: string;
  id: number;
}

export interface adminEditRecordResponse {
  message: string;
}

export interface adminDeleteRecordRequest {
  id: number;
}

export interface adminDeleteRecordsRequest {
  ids: number[];
}

export interface adminDeleteRecordResponse {
  message: string;
}

export interface searchForm {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
}
