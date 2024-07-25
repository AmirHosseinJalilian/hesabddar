import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {
//   AuthState,
//   ExchangeCodeChangedPayload,
//   RegisterStepsEnum,
//   ResetPasswordStepsEnum,
// } from 'src/@types/redux/auth';

import { RootState } from '../store';
import {
  AuthState,
  ExchangeCodeChangedPayload,
  RegisterStepsEnum,
  ResetPasswordStepsEnum,
} from 'src/@types/redux/auth';
// utils

// ----------------------------------------------------------------------

const initialState: AuthState = {
  resetPasswordPhone: '',
  registerPhone: '',
  sessionCode: '',
  registerStep: RegisterStepsEnum.Phone,
  resetPasswordStep: ResetPasswordStepsEnum.Phone,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetPasswordPhoneChanged: (state, action: PayloadAction<string>) => {
      state.resetPasswordPhone = action.payload;
    },
    registerPhoneChanged: (state, action: PayloadAction<string>) => {
      state.registerPhone = action.payload;
    },
    exchangeCodeChanged: (state, action: PayloadAction<ExchangeCodeChangedPayload>) => {
      state.sessionCode = action.payload;
    },
    registerStepChanged: (state, action: PayloadAction<RegisterStepsEnum>) => {
      state.registerStep = action.payload;
    },
    resetPasswordStepChanged: (state, action: PayloadAction<ResetPasswordStepsEnum>) => {
      state.resetPasswordStep = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Selectors
export const sessionCodeSelector = (state: RootState) => state.auth.sessionCode;
export const registerStepSelector = (state: RootState) => state.auth.registerStep;
export const resetPasswordStepSelector = (state: RootState) => state.auth.resetPasswordStep;
export const registerPhoneSelector = (state: RootState) => state.auth.registerPhone;
export const resetPasswordPhoneSelector = (state: RootState) => state.auth.resetPasswordPhone;

// Actions
export const {
  registerPhoneChanged,
  resetPasswordPhoneChanged,
  exchangeCodeChanged,
  registerStepChanged,
  resetPasswordStepChanged,
} = slice.actions;
