// src/config/env.ts

interface Env {
    VITE_APP_API_URL_DEV: string,
    VITE_APP_API_URL: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const env: Env = window._env_ || {
    VITE_APP_API_URL_DEV: "http://localhost:5170",
    VITE_APP_API_URL: "https://lunaaiserver-fxhre9fqc0hbenbu.canadacentral-01.azurewebsites.net"
};

export default env;
