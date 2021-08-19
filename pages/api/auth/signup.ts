import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, firstName, lastName, password, birthday } = req.body;
  if (req.method === 'POST') {
    const userExist = Data.user.exist(email);

    if (!email || !firstName || !lastName || !password || !birthday) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    } else if (userExist) {
      res.statusCode = 409;
      return res.send('이미 가입된 이메일입니다.');
    } else {
      const hashedPassword = bcrypt.hashSync(password, 8);
      const users = Data.user.getList();
      let userId;
      if (users.length === 0) {
        userId = 1;
      } else {
        userId = users[users.length - 1].id + 1;
      }

      const newUser: StoredUserType = {
        id: userId,
        email,
        firstName,
        lastName,
        password: hashedPassword,
        birthday,
        profileImage: '/static/image/user/default_user_profile_image.jpg',
      };

      Data.user.write([...users, newUser]);

      await new Promise(resolve => {
        const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
        res.setHeader(
          'Set-Cookie',
          `access_token=${token}; path=/; expires=${new Date(
            Date.now() + 60 * 60 * 24 * 1000 * 3,
          ).toISOString()}; httponly`,
        );
        resolve(token);
      });

      const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
        newUser;
      delete newUserWithoutPassword.password;
      res.statusCode = 200;
      return res.send(newUser);
    }
  }

  res.statusCode = 405;
  return res.end();
};
