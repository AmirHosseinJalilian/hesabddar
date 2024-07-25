import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
// eslint-disable-next-line import/no-cycle
import { hesab, bytebase, moadian } from 'src/_clients';
// import { RefreshToken } from 'src/_requests/vault/auth';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  // BACKUP_REFRESH_TOKEN_STORAGE_KEY,
  // BACKUP_ACCESS_TOKEN_STORAGE_KEY,
  // REFRESH_TOKEN_STORAGE_KEY,
} from './auth-provider';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ ExpiresAt: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.ExpiresAt > currentTime;
};

const isTokenExpired = (accessToken: string) => {
  const { ExpiresAt } = jwtDecode<{ ExpiresAt: number }>(accessToken);
  const currentTime = Date.now() / 1000;
  return ExpiresAt <= currentTime;
};

let __some_unique_expiredTimer: any;
let __some_unique_retryCount = 0;
const MAX_RETRY_COUNT = 3;

// const handleTokenExpired = async (ExpiresAt: number, old_refresh_token: string) => {
//   window.clearTimeout(__some_unique_expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = ExpiresAt * 1000 - currentTime;
//   if (timeLeft > 0 && __some_unique_retryCount < MAX_RETRY_COUNT) {
//     __some_unique_expiredTimer = window.setTimeout(async () => {
//       console.log('token expired. refreshing:');
//       try {
//         const response = await RefreshToken({ refresh_token: old_refresh_token });
//         const { access_token, refresh_token } = response.data;
//         __some_unique_retryCount++; // reset retry count after a successful refresh
//         setSession(access_token, refresh_token);
//       } catch (e) {
//         __some_unique_retryCount += __some_unique_retryCount; // increment retry count
//         console.log('Error in handleTokenExpired interval: ', e);
//       }
//     }, timeLeft);
//   } else {
//     try {
//       const result = await RefreshToken({ refresh_token: old_refresh_token });
//       const { access_token, refresh_token } = result.data;
//       setSession(access_token, refresh_token);
//     } catch (e) {
//       __some_unique_retryCount++;
//       console.log('Error in handleTokenExpired: ', e);
//     }
//   }
//   if (__some_unique_retryCount >= MAX_RETRY_COUNT) {
//     console.error('Failed to refresh the token after multiple attempts.');
//     // You can add additional logic here to handle the failure, such as redirecting to a login / path
//   }
// };

const setSession = (
  token: string | null,
  // refresh_token: string | null,
  remember: boolean = true
) => {
  if (token) {
    if (remember) {
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
      // localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh_token);
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
      // sessionStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh_token);
    }
    hesab.defaults.headers.common.Authorization = `Bearer ${token}`;
    moadian.defaults.headers.common.Authorization = `Bearer ${token}`;
    // moadian.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    // if (!isTokenExpired(accessToken)) {
    //   const { ExpiresAt } = jwtDecode<{ ExpiresAt: number }>(accessToken);
    //   console.log('Token ExpiresAt: ', ExpiresAt);
    //   handleTokenExpired(ExpiresAt, refresh_token).then((r) => console.log(r));
    // }
  } else {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    delete hesab.defaults.headers.common.Authorization;
    delete moadian.defaults.headers.common.Authorization;
  }
};

// const setBackupSession = (
//   backupAccessToken: string | null,
//   backupRefreshToken: string | null,
//   remember: boolean = true
// ) => {
//   if (backupAccessToken && backupRefreshToken) {
//     if (remember) {
//       localStorage.setItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY, backupAccessToken);
//       localStorage.setItem(BACKUP_REFRESH_TOKEN_STORAGE_KEY, backupRefreshToken);
//     } else {
//       sessionStorage.setItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY, backupAccessToken);
//       sessionStorage.setItem(BACKUP_REFRESH_TOKEN_STORAGE_KEY, backupRefreshToken);
//     }
//   } else {
//     localStorage.removeItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY);
//     sessionStorage.removeItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY);
//     localStorage.removeItem(BACKUP_REFRESH_TOKEN_STORAGE_KEY);
//     sessionStorage.removeItem(BACKUP_REFRESH_TOKEN_STORAGE_KEY);
//   }
// };

// const swapSession = (
//   accessToken: string | null,
//   refreshToken: string | null,
//   remember: boolean = false
// ) => {
//   const prevAccessToken =
//     localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ||
//     sessionStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
//   const prevRefreshToken =
//     localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) ||
//     sessionStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
//   if (prevAccessToken && prevRefreshToken) {
//     setBackupSession(prevAccessToken, prevRefreshToken, remember);
//     setSession(accessToken, refreshToken, remember);
//   }
// };

// const revertSession = () => {
//   const backupAccessToken =
//     localStorage.getItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY) ||
//     sessionStorage.getItem(BACKUP_ACCESS_TOKEN_STORAGE_KEY);
//   const backupRefreshToken =
//     localStorage.getItem(BACKUP_REFRESH_TOKEN_STORAGE_KEY) ||
//     sessionStorage.getItem(BACKUP_REFRESH_TOKEN_STORAGE_KEY);
//   if (backupAccessToken && backupRefreshToken) {
//     setBackupSession(null, null);
//     setSession(backupAccessToken, backupRefreshToken);

//     hesab.defaults.headers.common.Authorization = `Bearer ${backupAccessToken}`;
//     moadian.defaults.headers.common.Authorization = `Bearer ${backupAccessToken}`;
//   }
// };

// export { isValidToken, setSession, setBackupSession, swapSession, revertSession, verify, sign };
export { isValidToken, setSession, verify, sign };
