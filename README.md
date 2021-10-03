# Modular Application with Web Components

This is an example project to try out a modular setup where an application (Angular) is composed of several 'Modules' (Web Components) which are loaded via remote URLs.

# Quickstart
1. Clone this repository
2. Build the lib packages:
```bash
$ npm run build:libs
```
3. Install the packages (libs should get installed as well):
```bash
npm install
```
4. Build the web components:
```bash
npm run build:count-write && npm run build:count-read
```
5. Serve the web components using the http-server (using separate terminals):
```bash
npm run serve:count-write
npm run serve:count-read
```
6. Serve the main application and open `http://localhost:4200/`:
```bash
ng serve modular-app
```

The application should now load the two web components. Press the `start` button to start the interval, increasing the value every 5 seconds.

# Modular-app
This is the main application which loads in the others. The source code is located in `src/`. It is built with Angular `12.2.8`. In the root HTML file, `index.html`, a couple of scripts are loaded. Two scripts load in the Web Component via an external URL. Another script loads in environmental configuration, to enable setting a base-path for a HTTPService used in a web component.

## Env.js
This script, located in `src/assets/config/env.js`, sets some properties on the `window.__env` object, which can be read anywhere in the application, or in any web component. It is used to set the base paths for the HTTPServices used in a web component. 

When deploying this application on a Kubernetes cluster for example (or any server), you can modify the contents of `assets/config/env.js` to set the URLs with the deployment URLs of the backends.

# Count-write
This is a Web Component, built with `@angular/core@12.2.8`, and is a simple Angular Application, which is compiled to a Web Component using `@angular/elements`. The source code is located in `projects/count-write/`.

This application basically increases a value with a set interval and uses two (local) libraries, `@devdbe/halved` and `@devdbe/doubled` to calculate the halved and doubled values of that value. The value is also published via the browser window using a `CustomEvent`.

In `AppModule`, the values for the InjectionTokens (used in the libraries described below) are provided by reading the `window.__env` object for the paths. Also, the `ngDoBootstrap()` method will create a Custom Element (Web Component) from the `AppComponent`.

## @devdbe/halved
This Angular library can be found in `projects/halved` and exports a Component which shows the halved value of a given value, using the `HalveService` to simulate a call to a backend. The `HalveService` uses the `HALVE_PATH` InjectionToken to set the path to the (simulated) http backend.

## @devdbe/doubled
This Angular library can be found in `projects/doubled` and exports a Component which shows the doubled value of a given value, using the `DoubleService` to simulate a call to a backend. The `DoubleService` uses the `DOUBLE_PATH` InjectionToken to set the path to the (simulated) http backend.

# Count-read
This is a minimal implementation of a Web Component, using vanilla JavaScript. It listens to `CustomEvent`s on the `window` object for new values (emitted by the `count-write` Web Component) and displays it on screen.

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
    window.dispatchEvent(new CustomEvent('value-update', {
        detail: {
            value: this.value
        }
    }));
```
And listened to with the following code:
```js
    window.addEventListener('value-update', (e) => {
        this.value = e.detail.value;
        this.shadowRoot.querySelector('#valueField').textContent = this.value;
    });
```