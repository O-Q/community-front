export const environment = {
  production: true,
  configPath: './assets/config/config.prod.json',
  urls: {
    baseUrl: 'http://localhost:3000',
    auth: {
      SIGN_IN: 'auth/signin',
      SIGN_UP: 'auth/signup'
    },
    blog: {
      GET_BLOG: 'blog/:id'
    },
    forum: {
      GET_FORUM: 'forum/:id'
    }
  }
};
