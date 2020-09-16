import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_PATH: str(),
    POSTGRES_DATABASE: str(),
    JWT_SECRET: str(),
    PORT: port()
  });
}

export default validateEnv;
