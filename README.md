This repo serves as an extremely minimal starter for PacBio clients running with Angular 2 and TypeScript.
* Best practice in file organization for Angular 2.
* Ready to go build system using Webpack for working with TypeScript.

### Quick start
> Clone/Download the repo then edit `app.ts` inside [`/src/app/components/app.ts`](/src/app/components/app.ts)

```bash
$ npm start # then open your browser and go to http://localhost:8080
```


## File Structure
We use the component approach.
```
angular2-seed/
 ├──src/                              * our source files that will be compiled to javascript
 │   ├──app/                          * WebApp folder
 │   │   ├──bootstrap.ts              * entry file for app
 │   │   │
 │   │   ├──components/               * where most of components live
 │   │   │   ├──run.ts               * an example of a component using a service and forms
 │   │   │   ├──dashboard.ts          * a simple Component with a simple Directive example
 │   │   │   │
 │   │   │   ├──home/                 * example component as a folder
 │   │   │   │   ├──home.ts           * how you would require your template and style files
 │   │   │   │   ├──home.css          * simple css file for home styles
 │   │   │   │   └──home.html         * simple html file for home template
 │   │   │   │
 |   │   │   └──app.ts                * App.ts: entry file for components
 │   │   │
 │   │   ├──services/                 * where we keep our services used throughout our app
 │   │   │   ├──RunService.ts         * an example of a simple service 
 │   │   │   └──services.ts           * where we gather our injectables from our services
 │   │   │
 │   │   └──directives/               * where we keep our directives used throughout our app
 │   │       ├──Autofocus.ts          * another simple directive to fix a problem with the router
 │   │       └──directives.ts         * where we gather our directives from our directives
 │   │
 │   └──common/                       * where common files used throughout our app
 │       ├──shadowDomInjectables.ts   * determind if the user is on chrome and use ShadowDom
 │       ├──jitInjectables.ts         * turn on Just-In-Time Change Detection
 │       ├──formInjectables.ts        * services exported by angular/forms which is the FormBuilder
 │       └──BrowserDomAdapter.ts      * ignore this. we need to set the DomAdapter to the browser
 ├──public/                           * static assets are served here
 │   ├──lib/                          * static libraries
 │   │   └──traceur-runtime.min.js    * ignore this file. This is needed to polyfill the browser to for ES6 features to similarly
 │   ├──favicon.ico                   * replace me with your own favicon.ico
 │   └──index.html                    * Index.html: where we place our script tags
 │
 ├──typings/                          * where tsd defines it's types definitions
 │   ├──pacbio/                       * where we define our custom types
 │   │   ├──angular2.d.ts             * where we patch angular2 types with our own types until it's fixed
 │   │   └──pacbio.d.ts               * we include all of our custom types here
 │   │
 │   ├──angular2/
 │   │   └──angular2.d.ts             * our Angular 2 type definitions
 │   │
 │   ├──es6-promise/
 │   │   └──es6-promise.d.ts          * ES6 promises type definitions
 │   │
 │   ├──rx/
 │   │   ├──rx-lite.d.ts              * rx-lite type definitions
 │   │   └──rx.d.ts                   * rx type definitions
 │   │
 │   ├──pacbio/
 │   │   ├──angular-pacbio.d.ts       * Missing angular type definitions
 │   │   ├──jwt-decode.d.ts           * JWT type definitions
 │   │   ├──lib-pacbio.d.ts           * Missing lib type definitions
 │   │   ├──pacbio.d.ts               * Includes for all custom type definitions
 │   │   └──webpack.d.ts              * WebPack type definitions
 │   │
 │   └──tsd.d.ts.ts                   * our main file for all of our type definitions
 │
 ├──tsconfig.json                     * config that webpack uses for typescript
 ├──tsd.json                          * config that tsd uses for managing it's definitions
 ├──package.json                      * what npm uses to manage it's dependencies
 └──webpack.config.js                 * our webpack config
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
 > You may need to require `reference path` for your editor to autocomplete correctly
 ```
 /// <reference path="../../typings/tsd.d.ts" />
 ```
 Otherwise including them in `tsd.json` is preferred 

## Use a TypeScript-aware editor
We have good experience using these editors:

* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

### To Do
- [ ] production/development environments
- [ ] testing
- [ ] e2e
- [ ] production services examples
- [ ] hot-component-reloading

* [Twitter: @pacbio_dev](https://twitter.com/pacbio_dev)

___

