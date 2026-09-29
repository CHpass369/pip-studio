const enviroment = process.env.NODE_ENV || 'production';
const ip = 'localhost';
const domain = 'unboliviano';

const BASE_PATH = {
  development: {
    // ACCOUNTS: `http://${ip}:10101`,
    ACCOUNTS: `https://accounts.${domain}.com`,

    // APP: `http://${ip}:10018`,
    APP: `https://press.${domain}.com`,
  },
  production: {
    ACCOUNTS: `https://accounts.${domain}.com`,
    APP: `https://press.${domain}.com`,
  },
}[enviroment];

export { BASE_PATH };
