'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
//
// import { getAllPermissions } from 'src/_requests/site/getAllPermissions';
// import {
//   Impersonate as impersonateRequest,
//   Logout as logoutRequest,
//   ResetPassword as resetPasswordRequest,
//   Login as loginRequest,
//   Register as registerRequest,
// } from 'src/_requests/auth';
// import UserInfo from 'src/_requests/vault/auth/userInfo';
import { LoginIdentity as loginRequest } from 'src/_requests/auth';
import { isValidToken, setSession, } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, PermissionsType } from '../types';
import { AuthContext } from './auth-context';
import Cookies from 'js-cookie'

enum Types {
  Impersonate = 'IMPERSONATE',
  Revert = 'REVERT',
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
  Loading = 'LOADING',
}

type Payload = {
  [Types.Impersonate]: {
    user: AuthUserType;
  };
  [Types.Revert]: {
    user: AuthUserType;
  };
  [Types.Initial]: {
    isImpersonated: boolean;
    // permissions: PermissionsType;
    user: AuthUserType;
  };
  [Types.Login]: {
    user: AuthUserType;
    // permissions: PermissionsType;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUserType;
    // permissions: PermissionsType;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
  // permissions: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.Impersonate) {
    return {
      ...state,
      user: action.payload.user,
      isImpersonated: true,
    };
  }
  if (action.type === Types.Revert) {
    return {
      ...state,
      user: action.payload.user,
      isImpersonated: false,
    };
  }
  if (action.type === Types.Initial) {
    return {
      loading: false,
      user: action.payload.user,
      // permissions: action.payload.permissions,
      isImpersonated: action.payload.isImpersonated,
    };
  }
  if (action.type === Types.Login) {
    return {
      ...state,
      user: action.payload.user,
      // permissions: action.payload.permissions,
    };
  }
  if (action.type === Types.Register) {
    return {
      ...state,
      // permissions: action.payload.permissions,
      user: action.payload.user,
    };
  }
  if (action.type === Types.Logout) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const ACCESS_TOKEN_STORAGE_KEY = 'token';
// export const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';
// export const BACKUP_ACCESS_TOKEN_STORAGE_KEY = 'backupAccessToken';
// export const BACKUP_REFRESH_TOKEN_STORAGE_KEY = 'backupRefreshToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const initialize = useCallback(async () => {
  //   try {
  //     const accessToken =
  //       localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ||
  //       sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  //     const refreshToken =
  //       localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) ||
  //       sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  //     const backupToken =
  //       localStorage.getItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY) ||
  //       sessionStorage.getItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY);

  //     if (accessToken && isValidToken(accessToken) && refreshToken && isValidToken(refreshToken)) {
  //       // TODO: later i should cache remember to set it here otherwise in refresh always remember will be true
  //       setSession(accessToken, refreshToken);

  //       const response = await UserInfo();
  //       const user = response.data;

  //       const permissions = await getAllPermissions();

  //       dispatch({
  //         type: Types.Initial,
  //         payload: {
  //           user,
  //           permissions,
  //           isImpersonated: !!backupToken,
  //         },
  //       });
  //     } else {
  //       dispatch({
  //         type: Types.Initial,
  //         payload: {
  //           user: null,
  //           permissions: null,
  //           isImpersonated: false,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     dispatch({
  //       type: Types.Initial,
  //       payload: {
  //         user: null,
  //         permissions: null,
  //         isImpersonated: false,
  //       },
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   initialize();
  // }, [initialize]);

  // const impersonate = useCallback(async (UserID: string) => {
  //   const response = await impersonateRequest(UserID);
  //   const { access_token, refresh_token, user } = response.data;

  //   swapSession(access_token, refresh_token, true);
  //   dispatch({
  //     type: Types.Impersonate,
  //     payload: {
  //       user,
  //     },
  //   });
  // }, []);

  // const revert = useCallback(async () => {
  //   revertSession();
  //   const response = await UserInfo();
  //   const user = response.data;
  //   dispatch({
  //     type: Types.Revert,
  //     payload: {
  //       user,
  //     },
  //   });
  // }, []);

  // LOGIN
  const login = useCallback(async (userNameOrEmail: string, password: string) => {
    const a: any = {
      userNameOrEmail,
      password,
    };

    const { data } = await loginRequest(a);

    Cookies.set('token',data)
    // setSession(data);
    // setBackupSession(null, null);

    // const permissions = await getAllPermissions();

    // dispatch({
    //   type: Types.Login,
    //   payload: {
    //     // user,
    //     // user,
    //     // permissions,
    //   },
    // });
  }, []);

  // REGISTER
  // const register = useCallback(
  //   async (
  //     name: string,
  //     last_name: string,
  //     phone: string,
  //     password: string,
  //     invite_code: string,
  //     session_code: string
  //   ) => {
  //     const data = {
  //       name,
  //       last_name,
  //       phone,
  //       password,
  //       invite_code,
  //       session_code,
  //     };

  //     const response = await registerRequest(data);
  //     const { access_token, refresh_token, user } = response.data;

  //     setSession(access_token, refresh_token);
  //     setBackupSession(null, null);

  //     const permissions = await getAllPermissions();

  //     dispatch({
  //       type: Types.Register,
  //       payload: {
  //         user,
  //         permissions,
  //       },
  //     });
  //   },
  //   []
  // );

  // LOGOUT
  // const logout = useCallback(async () => {
  //   try {
  //     await logoutRequest();
  //   } finally {
  //     setSession(null, null);
  //     setBackupSession(null, null);
  //     dispatch({ type: Types.Logout });
  //   }
  // }, []);

  // const resetPassword = useCallback(
  //   async (phone: string, password: string, session_code: string) => {
  //     const data = {
  //       phone,
  //       password,
  //       session_code,
  //     };

  //     // const response = await resetPasswordRequest(data);
  //     const { user } = response.data;

  //     // setSession(access_token, refresh_token);

  //     const permissions = await getAllPermissions();

  //     setBackupSession(null, null);
  //     dispatch({
  //       type: Types.Login,
  //       payload: {
  //         user,
  //         permissions,
  //       },
  //     });
  //   },
  //   []
  // );

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  // const checkAuthenticated = state.user ? 'loading' : 'loading';


  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      // permissions: state.permissions,
      //
      login,
      // register,
      // logout,
      // impersonate,
      // revert,
      // resetPassword,
      // initialize,
    }),
    [
      login,
      // logout,
      // register,
      // impersonate,
      // revert,
      // resetPassword,
      status,
      state.user,
      // state.permissions,
      // initialize,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
