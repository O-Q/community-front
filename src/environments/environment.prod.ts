export const environment = {
  production: true,
  configPath: './assets/config/config.prod.json',
  BASE_FRONT_URL: 'https://dev.miakova.ir',
  urls: {
    wsUrl: 'wss://api.miakova.ir:8080',
    baseUrl: 'https://api.miakova.ir',
    search: {
      SEARCH: 'search',
      HOMEPAGE_SOCIAL: 'search/homepage/social',
      HOMEPAGE_POST: 'search/homepage/post'
    },
    auth: {
      SIGN_IN: 'auth/signin',
      SIGN_UP: 'auth/signup'
    },
    user: {
      GET_USER: 'user',
      GET_USER_INFO: 'user/:username',
      FOLLOW_USER: 'user/:username/follow',
      UNFOLLOW_USER: 'user/:username/unfollow',
      SOCIALS: 'user/socials',
      UPDATE_USER_EMAIL: 'user/account/email',
      UPDATE_USER_PASSWORD: 'user/account/password',
      UPLOAD_AVATAR: 'user/avatar',
      UPLOAD_BANNER: 'user/banner',
      DELETE_AVATAR: 'user/avatar',
      DELETE_BANNER: 'user/banner',
      UPDATE_PRIVACY: 'user/privacy',
    },
    blog: {
      BASE: 'blog',
      GET_BLOG: 'blog/name',
      DELETE_BLOG: 'blog/:sid',
      UPDATE_WIDGETS: 'blog/widget/bulk',
      UPDATE_INFO: 'blog/info',
      UPDATE_WIDGET: 'blog/widget',
      GET_DEFAULT_WIDGETS: 'blog/widget/default',
      UPLOAD_AVATAR: 'blog/avatar',
      UPLOAD_BANNER: 'blog/banner',
      DELETE_AVATAR: 'blog/avatar',
      DELETE_BANNER: 'blog/banner',
      JOIN_BY_SID: 'blog/join/:sid',
      LEAVE_BY_SID: 'blog/leave/:sid',
      SOCIAL_USERS: 'blog/users',
      UPDATE_SOCIAL_USERS: 'blog/users/:sid',
      REMOVE_SOCIAL_USER: 'blog/users/:sid/:uid',
      PERMISSION_ROLE: 'blog/permissions/:sid',




    },
    forum: {
      BASE: 'forum',
      GET_FORUM: 'forum/name',
      DELETE_FORUM: 'forum/:sid',
      UPDATE_WIDGETS: 'forum/widget/bulk',
      UPDATE_WIDGET: 'forum/widget',
      UPDATE_INFO: 'forum/info',
      GET_DEFAULT_WIDGETS: 'forum/widget/default',
      UPLOAD_AVATAR: 'forum/avatar',
      UPLOAD_BANNER: 'forum/banner',
      DELETE_AVATAR: 'forum/avatar',
      DELETE_BANNER: 'forum/banner',
      JOIN_BY_SID: 'forum/join/:sid',
      LEAVE_BY_SID: 'forum/leave/:sid',
      SOCIAL_USERS: 'forum/users',
      UPDATE_SOCIAL_USERS: 'forum/users/:sid',
      PERMISSION_ROLE: 'forum/permissions/:sid',
      REMOVE_SOCIAL_USER: 'forum/users/:sid/:uid',
    },
    post: {
      GET_POST: 'post/i/:pid',
      DELETE_POST: 'post/i/:pid',
      UPDATE_POST: 'post/i/:pid',
      UPDATE_REACTION: 'post/i/:pid/reaction',
      GET_POSTS_BY_SNAME: 'post/social',
      GET_POSTS_BY_USERNAME: 'post/user',
      CREATE_POST_BY_SID: 'post/social/:sid',
      CREATE_REPLAY_POST_BY_SID: 'post/i/:pid/social/:sid/reply',
      UPLOAD: 'post/upload'
    }
  }
};
