import { UserData } from "../user/userData";

export type LoginIdentityRequestBodyType = {
  // userNameOrEmail: '0372177611';
  // password: '39929556';
  userNameOrEmail: string;
  password: string;
  rememberMe: true;
};

export type LoginIdentityResponseDataType = {
  message: null;
  isSuccess: boolean;
  data: string;
  errorCode: null;
  error: string;
  errors: null;
  user: UserData
};

export type SignInRequestType = {
  userNameOrEmail: string;
  password: string;
  rememberMe: boolean;
};


export type SignInResponseType = {
  message: null;
  isSuccess: boolean;
  data: string;
  errorCode: null;
  error: string;
  errors: null;
  user: UserData
};

