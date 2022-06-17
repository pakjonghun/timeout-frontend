export interface joinForm {
  name: string;
  email: string;
  phone: number;
  password: string;
  passwordConfirm: string;
}

export interface loginForm {
  email: string;
  password: string;
}

export interface joinUser {
  id: number;
  email: string;
  name: string;
  role: 'Manager' | 'Client';
  phone: number;
}

export interface joinResponse {
  message: string;
  data?: joinUser;
}

export interface userResponse {
  message: string;
}

export interface me {
  id: number;
  startTime: string;
  endTime: string;
  userId: number;
  userRole: 'Manager' | 'Client';
}
