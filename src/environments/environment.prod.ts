export const environment = {
  production: true,
  configPath: './assets/config/config.prod.json',
  BASE_FRONT_URL: 'http://localhost:4200',
  urls: {
    baseUrl: 'http://localhost:3000',
    auth: {
      SIGN_IN: 'auth/signin',
      SIGN_UP: 'auth/signup'
    },
    user: {
      GET_USER: 'user',
      GET_USER_INFO: 'user/:username',
      SOCIALS: 'user/socials',
      UPDATE_USER_EMAIL: 'user/account/email',
      UPDATE_USER_PASSWORD: 'user/account/password',
      UPLOAD_AVATAR: 'user/avatar',
      UPLOAD_BANNER: 'user/banner',
      DELETE_AVATAR: 'user/avatar',
      DELETE_BANNER: 'user/banner',
    },
    blog: {
      BASE: 'blog',
      GET_BLOG: 'blog/name',
      UPDATE_WIDGETS: 'blog/widget/bulk',
      UPDATE_INFO: 'blog/info',
      UPDATE_WIDGET: 'blog/widget',
      DELETE_BLOG: 'blog/name',
      UPLOAD_AVATAR: 'blog/avatar',
      UPLOAD_BANNER: 'blog/banner',
      DELETE_AVATAR: 'blog/avatar',
      DELETE_BANNER: 'blog/banner',

    },
    forum: {
      BASE: 'forum',
      GET_FORUM: 'forum/name',
      UPDATE_WIDGETS: 'forum/widget/bulk',
      UPDATE_WIDGET: 'forum/widget',
      UPDATE_INFO: 'forum/info',
      GET_DEFAULT_WIDGETS: 'forum/widget/default',
      DELETE_FORUM: 'forum/name',
      UPLOAD_AVATAR: 'forum/avatar',
      UPLOAD_BANNER: 'forum/banner',
      DELETE_AVATAR: 'forum/avatar',
      DELETE_BANNER: 'forum/banner',
    },
    post: {
      GET_POST: 'post/i/:pid',
      DELETE_POST: 'post/i/:pid',
      UPDATE_POST: 'post/i/:pid',
      UPDATE_REACTION: 'post/i/:pid/reaction',
      GET_POSTS_BY_SNAME: 'post/social',
      GET_POSTS_BY_USERNAME: 'post/user',
      CREATE_POST_BY_SID: 'post/social/:sid',
      CREATE_REPLAY_POST_BY_SID: 'post/i/:pid/social/:sid/reply'
    }
  }
};
