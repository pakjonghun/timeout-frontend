import { record } from './record';

export interface joinForm {
  name: string;
  email: string;
  phone: number;
  password: string;
  passwordConfirm: string;
}

export interface editProfileForm {
  email?: string;
  phone?: number;
  avatar?: string;
}

export interface editProfileRequest {
  email?: string;
  phone?: number;
  avatar?: string;
}

export interface editProfileResponst {
  message: string;
}

export interface editPasswordResponse {
  message: string;
}

export interface editPasswordForm {
  password: string;
  passwordConfirm: string;
}

export interface editPasswordRequest {
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
  data: {
    id: number;
    role: 'Manager' | 'Client';
  };
  message: string;
}

export interface me {
  data: {
    id: number;
    role: 'Manager' | 'Client';
    avatar?: string | null;
    recordList: record;
  };
  message: string;
}

export interface privateInfo {
  data: {
    id: number;
    phone: number;
    email: string;
    name: string;
  };
  message: string;
}
