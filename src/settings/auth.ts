import { jwtAuth /*, demoAuth */ } from 'rdy-admin';

// Провайдер авторизации. Реальный бэк — jwtAuth(); локальная отладка — demoAuth().
export const auth = jwtAuth({
  loginPath: '/auth/login',
  mePath: '/auth/me',
  tokenField: 'accessToken',
});
