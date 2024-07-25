import { OtpReasons } from "../valt/verify";

export enum RegisterStepsEnum {
  Phone = 'PHONE',
  OTP = 'OTP',
  Data = 'DATA',
}

export enum ResetPasswordStepsEnum {
  Phone = 'PHONE',
  OTP = 'OTP',
  Password = 'PASSWORD',
}

export interface AuthState {
  sessionCode: string;
  registerPhone: string;
  registerStep: RegisterStepsEnum;
  resetPasswordPhone: string;
  resetPasswordStep: ResetPasswordStepsEnum;
}

export type LoginValuesType = {
  phone: string;
  password: string;
  remember: boolean;
};

export type OtpValuesType = {
  reason: OtpReasons | null;
  token: string;
  coolDown: number;
};

// --------------- Payloads ---------------
export type OtpReasonChangedPayload = OtpReasons;
export type LoginValuesChangedPayload = LoginValuesType;
export type OtpValuesChangedPayload = OtpValuesType;
export type ExchangeCodeChangedPayload = string;
