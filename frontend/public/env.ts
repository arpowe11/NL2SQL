// public/env.ts
// This file will be served as a static JS file and can read environment variables at runtime

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window._env_ = {
    VITE_APP_API_URL_DEV: process.env.VITE_APP_API_URL_DEV || "http://localhost:5170",
    VITE_APP_API_URL: process.env.BACKEND_URL || "https://lunaaiserver-fxhre9fqc0hbenbu.canadacentral-01.azurewebsites.net"
};
