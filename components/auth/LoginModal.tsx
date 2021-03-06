import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import Input from '../common/Input';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { loginAPI } from '../../lib/api/auth';
import { userActions } from '../../store/user';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .login-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

interface LoginModalType {
  closeModal: () => void;
}

function LoginModal({ closeModal }: LoginModalType) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordHided, setIsPasswordHided] = useState(true);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };

  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode('signup'));
  };

  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert('???????????? ??????????????? ??????????????????.');
    } else {
      const loginBody = { email, password };
      try {
        const { data } = await loginAPI(loginBody);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container onSubmit={onSubmitLogin}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="????????? ??????"
          name="email"
          type="email"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="????????????"
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={togglePasswordHiding} />
            ) : (
              <OpenedEyeIcon onClick={togglePasswordHiding} />
            )
          }
          type={isPasswordHided ? 'password' : 'text'}
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="submit">?????????</Button>
      </div>
      <p>
        ?????? ??????????????? ????????? ??????????
        <span className="login-modal-set-signup" onClick={changeToSignUpModal}>
          ????????????
        </span>
      </p>
    </Container>
  );
}

export default LoginModal;
