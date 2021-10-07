# Modular Application with Web Components

This is an example project to try out a modular setup where an application is composed of several 'Modules' (Web Components) which are loaded via remote URLs.

# Quickstart
1. Clone this repository
2. Install and start Web Component 1
```bash
cd web-components/wc1 && npm i && npm run build && npm run serve
```
It is now served at `http://localhost:4210`
3. Install and start Web Component 2
```bash
cd web-components/wc2 && npm i && npm run build && ng serve
```
It is now served at `http://localhost:4220`
4. Install and start Web Component 3
```bash
cd web-components/wc3 && npm i && npm run build && npm run serve
```
It is now served at `http://localhost:4230`
5. Install and start the Shell
```bash
cd react-shell && npm i && npm run build && npm run serve
```
The application is now ready to be viewed at `http://localhost:4201`.

The application should now load the three web components. Press the `start` button to start the interval, increasing the value every 5 seconds. The other web components should pick up the value each time it is increased.

# react-shell
This is the main application which loads in the others. It is built with `React` and uses Webpack's Module Federation technique to load two Web Components (wc1 and wc2). 
It also loads in a Web Component (wc3) by adding a `<script>` tag in the HTML with the remote URL of that Web Component. The webpack config loads the remote modules statically:
```js
name: 'shell',
remotes: {
    // key must match first part of import in application, e.g. `import(<key>/<remoteKey>)`
    // where <remoteKey> is the key in the exposes object of the remote module webpack config
    // url prefix (before the `@`) must match the library name in the the remote module webpack config
    vanilla: 'wc1@http://localhost:4210/vanilla-wc.js',
    angular: 'wc2@http://localhost:4220/angular-wc.js'
}
```

## Env.js
This script, located in `react-shell/public/assets/config/env.js`, sets some properties on the `window.__env` object, which can be read anywhere in the application, or in any web component. It is used to set the base paths for two libraries used in a web component (simulating a backend http call). 

When deploying this application on a Kubernetes cluster for example (or any server), you can modify the contents of `assets/config/env.js` to set the URLs with the deployment URLs of the backends. It can also be used to pass module configuration (which module to load and what it's config is).

# wc1
This is a vanilla Web Component (Custom Element), written in TypeScript. It is bundled with Webpack and uses the `ModuleFederationPlugin` to expose itself as a remote module. The config of the plugin: 
```js
name: 'wc1',
library: {
    type: 'var',
    name: 'wc1' // This name is used in the host as prefix in the URL: wc1@http://localhost:4210/vanilla-wc.js
},
filename: 'vanilla-wc.js', // This filename is used in the host when defining the URL of the remote
exposes: {
    // Note: key must be in format `./<key>` when it is used in the host // TODO find reason?
    './component': './src/counter-reader' // The key is used in the host when importing the code in the application
},
shared: {
    'rxjs': {
        singleton: true,
        strictVersion: true,
        requiredVersion: '^7.4.0'
    }
}
```

# wc2
This is a Web Component, built with Angular, and is a simple Angular Application, which defines a Web Component using `@angular/elements`. It is exposed as a remote module using Webpack's Module Federation.

This application has a counter which increases its value with a set interval and uses two (local) libraries, `@devdbe/halved` and `@devdbe/doubled` to calculate the halved and doubled values of that value. The value is also published using a `CustomEvent`.

In `AppModule`, the values for the InjectionTokens (used in the libraries described below) are provided by reading the `window.__env` object for the paths. Also, the `ngDoBootstrap()` method will create a Custom Element (Web Component) from the `AppComponent`.
```ts
ngDoBootstrap() {
    const countWriteElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('count-write', countWriteElement);
  }
```

The webpack config for the Module Federation plugin: 
```js
name: 'wc2',
library: {
    type: 'var',
    name: 'wc2' // This name is used in the host as prefix in the URL: wc1@http://localhost:4220/angular-wc.js
},
filename: 'angular-wc.js', // This filename is used in the host when defining the URL of the remote
exposes: {
    // Note: key must be in format `./<key>` when it is used in the host // TODO find reason?
    './web-components': path.join(__dirname, './src/bootstrap') // The key is used in the host when importing the code in the application
},
shared: {
    '@angular/core': {
        singleton: true,
        strictVersion: true,
        requiredVersion: '~12.2.8'
    },
    '@angular/elements': {
        singleton: true,
        strictVersion: true,
        requiredVersion: '~12.2.8'
    },
    '@angular/platform-browser': {
        singleton: true,
        strictVersion: true,
        requiredVersion: '~12.2.8'
    },
    '@angular/platform-browser-dynamic': {
        singleton: true,
        strictVersion: true,
        requiredVersion: '~12.2.8'
    },
    'rxjs': {
        singleton: true,
        strictVersion: true,
        requiredVersion: '^7.4.0'
    }
}
```
The shared packages are fetch by webpack when this module is loaded in the shell. The shell does not need to install these packages itself.

## @devdbe/halved
This Angular library can be found in `web-components/wc2/projects/halved` and exports a Component which shows the halved value of a given value, using the `HalveService` to simulate a call to a backend. The `HalveService` uses the `HALVE_PATH` InjectionToken to set the path to the (simulated) http backend.

## @devdbe/doubled
This Angular library can be found in `web-componenst/wc2/projects/doubled` and exports a Component which shows the doubled value of a given value, using the `DoubleService` to simulate a call to a backend. The `DoubleService` uses the `DOUBLE_PATH` InjectionToken to set the path to the (simulated) http backend.

# wc3
This is a Web Component, built with Angular, and compiled to a single JavaScript bundle using `@angular/elements`. That single bundle is hosted on a http-server and ready to be loaded directly into an app with the `<script>` tag. The application simply uses `rxjs` to listen to `CustomEvents` to show the value of the counter. 
**It does not use Module Federation.**

# State sharing
The Web Components share state by using the `CustomEvents` to notify interested components of new values of an object or property. These events are sent via the `window` object and have the following signature:
```js
CustomEvent<T> {
    detail: T,
    type: string,
    bubbles: boolean,
    cancelable: boolean
    ...
}
```
In the `detail` property we can put any object to share. The event is sent with the following code:
```js
    window.dispatchEvent(new CustomEvent('counter-update', {
        detail: {
            value: this.value
        }
    }));
```
And listened to with the following code:

## HTML
```js
    window.addEventListener('counter-update', (e) => {
        this.value = e.detail.value;
        this.shadowRoot.querySelector('#valueField').textContent = this.value;
    });
```

## rxjs
```ts
fromEvent(window, 'counter-update')
    .subscribe(event => {
        const customEvent = (event as CustomEvent);
        this.value = customEvent.detail.value;
    });
```

# Open issues
1. zone.js
 The shell application needs to import `zone.js` when bootstrapping the application, because some Web Components are built with Angular and it requires that package. It is possible to run Angular without `zone.js`, but then we would have to trigger ChangeDetection manually. Something to consider. 
[Angular Elements](https://www.angulararchitects.io/aktuelles/angular-elements-part-iii/) by Manfred Steyer

2. Dynamically import the remote modules. 
Right now the remote modules are loaded statically, as the URL's are in the webpack config. This should be done dynamically, by moving the module config to the `env.js` file and create a service (and a wrapper component) to load them based on that config.

3. Multple calls
It seems that the code in the libs are triggered twice, immediately upon starting the counter. Also when stopping the counter. Could be the Angular Changedetection triggering twice, as it does that in development mode. Check if the build is for production.
