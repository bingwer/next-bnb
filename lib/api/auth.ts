import axios from 'axios';
import { UserType } from '../../types/user.d';

interface SignUpAPIBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

export const signUpAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>('/api/auth/signup', body);

export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login', body);
