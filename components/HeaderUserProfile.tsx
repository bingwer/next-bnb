import Link from 'next/link';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { logoutAPI } from '../lib/api/auth';
import { useSelector } from '../store';
import { userActions } from '../store/user';
import HamburgerIcon from '../public/static/svg/header/hamgurgerIcon.svg';
import styled from 'styled-components';
import palette from '../styles/palette';

const Container = styled.div`
  .header-logo-wrapper + div {
    position: relative;
  }

  .header-usermenu {
    position: absolute;
    right: 0;
    top: 52px;
    width: 240px;
    padding: 8px 0;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    background-color: white;
    li {
      display: flex;
      align-items: center;
      width: 100%;
      height: 42px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-usermenu-divider {
      width: 100%;
      height: 1px;
      margin: 8px 0;
      background-color: ${palette.gray_dd};
    }
  }
`;

function HeaderUserProfile() {
  const dispatch = useDispatch();
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false);
  const userProfileImage = useSelector(state => state.user.profileImage);

  const logout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container>
      <OutsideClickHandler
        onOutsideClick={() => {
          if (isUsermenuOpened) {
            setIsUsermenuOpened(false);
          }
        }}
      >
        <button
          className="header-user-profile"
          type="button"
          onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
        >
          <HamburgerIcon />
          <img
            src={userProfileImage}
            className="header-user-profile-image"
            alt=""
          ></img>
        </button>
        {isUsermenuOpened && (
          <ul className="header-usermenu">
            <li>숙소 관리</li>
            <Link href="/room/register/building">
              <a
                role="presentation"
                onClick={() => {
                  setIsUsermenuOpened(false);
                }}
              >
                <li>숙소 등록하기</li>
              </a>
            </Link>
            <div className="header-usermenu-divider" />
            <li role="presentation" onClick={logout}>
              로그아웃
            </li>
          </ul>
        )}
      </OutsideClickHandler>
    </Container>
  );
}

export default HeaderUserProfile;
