// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  BaseUrl: 'http://localhost/project1/',
  firebase: {
    apiKey: "AIzaSyB0_6xMVc4dErtaf87PybVE6ZTX3gLOsv0",
    authDomain: "pasarpagisegar.firebaseapp.com",
    databaseURL: "https://pasarpagisegar.firebaseio.com",
    projectId: "pasarpagisegar",
    storageBucket: "pasarpagisegar.appspot.com",
    messagingSenderId: "1092719338139",
    appId: "1:1092719338139:web:13db0e23a5450167"
  }
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
