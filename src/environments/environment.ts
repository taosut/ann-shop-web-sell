import { appInitializerFactory } from '@angular/platform-browser/src/browser/server-transition';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const _api = "/api/v1";

export const environment = {
    production: false,
    api: _api,
    apiPageHome: _api + "/home",
    apiPgaeCategory: _api + "/category",
    apiPageProduct: _api +"/product",
    apiPageSearch: _api + "/search",
    apiPageTag: _api + "/tag",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
