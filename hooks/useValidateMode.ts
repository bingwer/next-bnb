import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store';
import { commonActions } from '../store/common';

function useValidateMode() {
  const dispatch = useDispatch();
  const validateMode = useSelector(state => state.common.validateMode);

  const setValidateMode = (value: boolean) =>
    dispatch(commonActions.setValidationMode(value));

  return { validateMode, setValidateMode };
}

export default useValidateMode;
