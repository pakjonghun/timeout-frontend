export interface startTimerRequest {
  startTime: Date;
  description?: string;
}

export interface startTimeData {
  id: number;
  startTime: Date;
  endTime: Date | null;
  description: string;
}

export interface startTimerResponse {
  data: startTimeData;
  message: string;
}
