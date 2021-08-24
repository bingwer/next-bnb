import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/palette';

const getButtonColor = (color: string) => {
  switch (color) {
    case 'dark_cyan':
      return css`
        background-color: ${palette.dark_cyan};
      `;
    default:
      return css`
        background-color: ${palette.bittersweet};
      `;
  }
};

const Container = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 16px;
  font-weight: 800;
  outline: none;
  cursor: pointer;
  ${props => getButtonColor(props.color || '')}
`;

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, color, ...props }: ButtonType) {
  return (
    <Container {...props} color={color}>
      {children}
    </Container>
  );
}

export default React.memo(Button);
