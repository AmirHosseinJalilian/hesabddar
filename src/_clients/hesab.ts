import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import {onReject} from "./onReject";

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_HESAB_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const hesab = axios.create(defaultOptions);

hesab.interceptors.response.use(
  (response) => response,
  onReject,
);

export default hesab;
