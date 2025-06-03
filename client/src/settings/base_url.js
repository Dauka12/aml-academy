const isProd = import.meta.env.PROD;

const PROD_URL = 'https://amlacademy.kz';
const DEV_URL = 'http://localhost:8444';
// const DEV_URL = 'https://amlacademy.kz';

export const base_url = isProd ? PROD_URL : DEV_URL;

export default base_url;