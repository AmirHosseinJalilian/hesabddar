import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { onReject } from "./onReject";

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_MOADIAN_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

const moadian = axios.create(defaultOptions);

moadian.interceptors.response.use(
  (response) => response,
  onReject,
);

export default moadian;
