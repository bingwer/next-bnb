import axios from 'axios';
import { UserType } from '../../types/user.d';

interface SignUpAPIBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

export const signUpAPI: any = (body: SignUpAPIBody) => {
  axios.post<UserType>('/api/auth/signup', body);
};
