import axios from 'axios';

interface SignUpAPIBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

export const signUpAPI = (body: SignUpAPIBody) => {
  axios.post('/api/auth/signup', body);
};
