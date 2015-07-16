# Deprecated... Please use pacbio-seed
This repo serves as an extremely minimal starter for PacBio client applications running with Angular 2 and TypeScript.
* Best practice in file organization for Angular 2.
* Hot build system using Webpack for working with TypeScript.

```bash
$ npm start # then open your browser and go to http://localhost:8080
```

## File Structure
```
angular2-seed/
 ├──src/                                  * our source files that will be compiled to javascript
 │   ├──config/                           * where application config files live
 │   │   ├──keystore                      * where application keys live
 │   │   │   ├──private.pem               * private key used to encode a JWT
 │   │   │   └──public.pem                * public key used to decode a JWT
 │   │   │
 │   │   ├──app.yml                       * global settings for the application
 │   │   └──spa.yml                       * settings for the spa (Angular2) server
 │   │   │
 │   ├──extensions/                       * where system extension files live
 │   │   ├──includes/                     * where system extension javascript files live
 │   │   │   ├──object.js                 * adds proxy methods to Object extension class to the native Object class
 │   │   │   └──string.js                 * adds proxy methods to String extension class to the native String class
 │   │   |
 │   │   ├──extensions.ts                 * Implementations of extensions to native classes
 │   │   └──md5.ts                        * MD5 helper module
 │   │
 │   ├──server/                           * where the server classes live
 │   │   ├──api.ts                        * server class for the api (RESTful endpoints) server 
 │   │   └──spa.ts                        * server class for the spa (Angular2) server
 │   │
 │   ├──spa/                              * where the spa files live
 │   │   ├──app/                          *  
 │   │   │   ├──components/               * where most of components live
 │   │   │   │   ├──app/                  * where the appication component lives
 │   │   │   │   │   ├──app.ts            * application main component source
 │   │   │   │   │   ├──app.css           * simple css file for component styles
 │   │   │   │   │   └──app.html          * simple html file for component template
 │   │   │   │   │
 │   │   │   │   ├──home/                 * where the main landing component lives
 │   │   │   │   │   ├──home.ts           * main landing component source
 │   │   │   │   │   ├──home.css          * simple css file for component styles
 │   │   |   │   │   └──home.html         * simple html file for component template
 │   │   │   │   │
 │   │   │   │   ├──login/                * where the login component lives
 │   │   │   │   │   ├──login.ts          * how you would require your template and style files
 │   │   │   │   │   ├──login.css         * simple css file for component styles
 │   │   │   │   │   └──login.html        * simple html file for component template
 │   │   │   │   │
 │   │   │   │   ├──dashboard.ts          * dashboard component (sample)
 │   │   │   │   └──run.ts                * run edit component using a service and forms (sample)
 │   │   │   │
 │   │   │   ├──directives/               * where application directives live
 │   │   │   │   ├──Autofocus.ts          * simple directive to set focus to the first control in the view
 │   │   │   │   ├──LoggedInOutlet.ts     * directive to enforce login when accessing non public views
 │   │   │   │   ├──XLarge.ts             * simple directive to set text to a larger size
 │   │   │   │   └──directives.ts         * a simple way to include all directives
 │   │   │   │
 │   │   │   ├──services/                 * where application services live
 │   │   │   │   ├──RunService.ts         * a service to add runs (sample) 
 │   │   │   │   ├──Store.ts              * base service class to manage in-memory list (sample)
 │   │   │   │   └──services.ts           * a simple way to include all injectable services
 │   │   │   |   
 │   │   │   └──bootstrap.ts              * bootstraps the application component
 │   │   |
 │   │   ├──common/                       *  
 │   │   │   ├──BrowserDomAdapter.ts      * 
 │   │   │   ├──fetch.ts                  * 
 │   │   │   ├──formInjectables           * 
 │   │   │   ├──jitInjectables            * 
 │   │   │   └──shadowDomInjectables      * 
 │   │   |
 │   │   └──public/                       * static content is served here
 │   │       ├──css/                      * where site wide css files live
 │   │       ├──img/                      * where site wide image files live
 │   │       ├──favicon.ico               * SPA site icon
 │   │       └──index.html                * Index.html: Main page for SPA
 │   │    
 │   ├──strings/                          *
 |   |   └──en-us/                        *
 |   |       └──error.strings             *
 │   │    
 |   ├──error.ts                          *
 │   └──strings.js                        * 
 │
 ├──typings/                              * where typescript type definitions live
 │   ├──angular2/
 │   │   └──angular2.d.ts                 * our Angular 2 type definitions
 │   │
 │   ├──es6-promise/
 │   │   └──es6-promise.d.ts              * ES6 promises type definitions
 │   │
 │   ├──rx/
 │   │   ├──rx-lite.d.ts                  * rx-lite type definitions
 │   │   └──rx.d.ts                       * rx type definitions
 │   │
 │   ├──json-fn/
 │   │   └──json-fn.d.ts                  * json-fn type definitions
 │   │
 │   ├──pacbio/
 │   │   ├──angular-pacbio.d.ts           * missing angular type definitions
 │   │   ├──jwt-decode.d.ts               * jwt type definitions
 │   │   ├──lib-pacbio.d.ts               * missing lib type definitions
 │   │   ├──pacbio.d.ts                   * includes for all custom type definitions
 │   │   └──webpack.d.ts                  * webpack type definitions
 │   │
 │   └──tsd.d.ts                          * our main file for all of our type definitions
 │
 ├──gulpfile.ts                           * config that webpack uses for typescript
 ├──tsconfig.json                         * config that webpack uses for typescript
 ├──tsd.json                              * config that tsd uses for managing it's definitions
 ├──package.json                          * what npm uses to manage it's dependencies
 └──webpack.config.js                     * our webpack config
```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v0.12.2`+ and NPM `2.10.0`+

Once you have those, you should install these globals with `npm install -global`:
* 
* 

## Installing
* `npm install` to install all dependencies
* 

## Running the app
After you have installed all dependencies you can now run the app. Run `gulp server` to start a local server. In `development`mode, the server will watch, build (in-memory), and reload the app automatically.
 
### server
```bash
$ gulp
```

### build files
```bash
$ gulp
```

### watch and build files
```bash
$ gulp
```

# TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

## Use latest TypeScript compiler
TypeScript 1.5 beta includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

    $ npm install -global typescript@^1.5.0-beta

## .d.ts Typings
The typings in `typings/` are partially autogenerated, partially hand
written. 

    $ npm install -global tsd
    $ tsd install node --commit f0aa5507070dc74859b636bd2dac37f3e8cab8d1
    $ gulp tsd
    
 > You may need to require `reference path` for your editor to autocomplete correctly
 ```
 /// <reference path="../../typings/tsd.d.ts" />
 ```
 `tsd.json` contains all the typings required by the application. 

* [Twitter: @pacbio_dev](https://twitter.com/pacbio_dev)

