import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import palette from '../../styles/palette';

import CloseXIcon from '../../public/static/svg/modal/modal_close_x_icon.svg';
import MailIcon from '../../public/static/svg/auth/mail.svg';
import PersonIcon from '../../public/static/svg/auth/person.svg';
import OpenedEyeIcon from '../../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../../public/static/svg/auth/closed_eye.svg';
import Selector from '../common/Selector';
import { dayList, monthList, yearList } from '../../lib/staticData';
import Button from '../common/Button';
import { signUpAPI } from '../../lib/api/auth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/user';
import { commonActions } from '../../store/common';
import useValidateMode from '../../hooks/useValidateMode';
import PasswordWarning from './PasswordWarning';

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  user-select: none;
  -webkit-user-select: none;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthdat-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .sign-up-modal-set-login {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`;

const PASSWORD_MIN_LENGTH = 8;

interface SignUpModalType {
  closeModal: () => void;
}

function SignUpModal({ closeModal }: SignUpModalType) {
  const dispatch = useDispatch();
  const { setValidateMode } = useValidateMode();
  const [email, setEamil] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();

  const [passwordFocused, setPasswordFocused] = useState<boolean>(true);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEamil(e.target.value);
  };

  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onChangeBirthYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(e.target.value);
  };

  const onChangeBirthMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(e.target.value);
  };

  const onChangeBirthDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(e.target.value);
  };

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastName ||
      password.includes(lastName) ||
      password.includes(email.split('@')[0]),
    [password, lastName, email],
  );

  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password],
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password],
  );

  const validateSignUpForm = () => {
    if (!email || !lastName || !firstName || !password) {
      return false;
    }

    if (
      !isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    ) {
      return false;
    }

    if (!birthDay || !birthMonth || !birthYear) {
      return false;
    }

    return true;
  };

  const onSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidateMode(true);

    if (!email || !lastName || !firstName || !password) {
      return false;
    }

    if (validateSignUpForm()) {
      try {
        const signUpBody = {
          email,
          lastName,
          firstName,
          password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace('월', '')}-${birthDay}`,
          ).toISOString(),
        };
        const { data } = await signUpAPI(signUpBody);
        dispatch(userActions.setLoggedUser(data));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          value={email}
          onChange={onChangeEmail}
          icon={<MailIcon />}
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요합니다."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름(예: 길동)"
          value={lastName}
          onChange={onChangeLastName}
          icon={<PersonIcon />}
          useValidation
          isValid={!!lastName}
          errorMessage="이름을 입력하세요."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성(예: 홍)"
          value={firstName}
          onChange={onChangeFirstName}
          icon={<PersonIcon />}
          useValidation
          isValid={!!firstName}
          errorMessage="성을 입력하세요."
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="비밀번호"
          type={hidePassword ? 'password' : 'text'}
          value={password}
          onChange={onChangePassword}
          onFocus={onFocusPassword}
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            !isPasswordHasNumberOrSymbol
          }
          errorMessage="비밀번호를 입력하세요"
        />
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={isPasswordHasNameOrEmail}
            text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
          />
          <PasswordWarning isValid={!isPasswordOverMinLength} text="최소 8자" />
          <PasswordWarning
            isValid={isPasswordHasNumberOrSymbol}
            text="숫자나 기호를 포함하세요."
          />
        </>
      )}
      <p className="sign-up-birthdat-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 이용자에게 공개되지 않습니다.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={['월']}
            defaultValue="월"
            value={birthMonth}
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={['일']}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={['년']}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">가입하기</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={() => {}}
        >
          로그인
        </span>
      </p>
    </Container>
  );
}

export default SignUpModal;
