// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// NOTE: ":something" will replace with value in makeURLs function
// NOTE: "something=xxx" will replace "xxx" with value in makeURLs function
export const environment = {
  production: false,
  configPath: './assets/config/config.json',
  BASE_FRONT_URL: 'http://localhost:4200',
  urls: {
    baseUrl: 'http://localhost:3000',
    auth: {
      SIGN_IN: 'auth/signin',
      SIGN_UP: 'auth/signup'
    },
    user: {
      GET_USER: 'user',
      SOCIALS: 'user/socials',
    },
    blog: {
      BASE: 'blog',
      GET_BLOG: 'blog/:sname',
    },
    forum: {
      BASE: 'forum',
      GET_FORUM: 'forum/:sname',
    },
    post: {
      GET_POST: 'post/:pid/social/:sname',
      GET_POSTS_BY_SNAME: 'post/social/:sname',
      CREATE_POST_BY_SID: 'post/social/:sid'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
