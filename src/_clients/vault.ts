import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import {onReject} from "./onReject";

console.log(process.env.NEXT_PUBLIC_HESAB_BASE_URL)

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_HESAB_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const vault = axios.create(defaultOptions);

// Add a response interceptor
vault.interceptors.response.use(
  (response) => response, onReject);

export default vault;


export const vaultNoRefresh = axios.create(defaultOptions);
vaultNoRefresh.interceptors.response.use(
  (response) => response, (error) => {
    window.location.reload()
    return Promise.reject(
      (error.response && error.response.data) || {
        message: 'خطایی در ارتباط با سرور رخ داد',
      },
    );
  }
);
