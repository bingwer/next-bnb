import React from 'react';
import { useSelector } from '../../store';
import SignUpModal from './SignUpModal';

interface AuthModalProps {
  closeModal: () => void;
}

function AuthModal({ closeModal }: AuthModalProps) {
  const authMode = useSelector(state => state.auth.authMode);
  return (
    <>
      {authMode === 'signup' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'login' && <div>로그인</div>}
    </>
  );
}

export default AuthModal;
