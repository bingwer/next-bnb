import React from 'react';
import { useSelector } from '../../store';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

interface AuthModalProps {
  closeModal: () => void;
}

function AuthModal({ closeModal }: AuthModalProps) {
  const authMode = useSelector(state => state.auth.authMode);
  return (
    <>
      {authMode === 'signup' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'login' && <LoginModal closeModal={closeModal} />}
    </>
  );
}

export default AuthModal;
