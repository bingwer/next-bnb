import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import RedXIcon from '../../public/static/svg/auth/red_x_icon.svg';
import GreenCheckIcon from '../../public/static/svg/auth/green_check_icon.svg';

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) =>
    isValid ? palette.davidson_orange : palette.green};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

interface PassValidType {
  isValid: boolean;
  text: string;
}

function PasswordWarning({ isValid, text }: PassValidType) {
  return (
    <Container isValid={isValid}>
      {isValid ? <RedXIcon /> : <GreenCheckIcon />}
      {text}
    </Container>
  );
}

export default PasswordWarning;
