// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// NOTE: ":something" will replace with value in makeURLs function
// NOTE: "something=xxx" will replace "xxx" with value in makeURLs function
export const environment = {
  production: false,
  configPath: './assets/config/config.json',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
