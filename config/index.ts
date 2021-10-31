const dev = process.env.NODE_ENV === 'development';

export const NEXT_SERVER = dev
  ? process.env.LOCAL_SERVER
  : process.env.PROD_SERVER;

export const BASE_URL = dev
  ? 'http://localhost:3000'
  : 'https://solip-math.vercel.app';
