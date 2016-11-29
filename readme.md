# LocalStorage watcher

Watch changes in browser localStorage

## Installation
Simply run `npm install localstorage-watcher --save` or clone the repository.

## Usage
The whole system works on `storageWatcher` global variable.

### Methods and Properties
* `settings` private property, an object that holds default settings. Default settings are:
	1. __duration__ defaults to 1500ms or 1.5 seconds
	2. __logType__ defaults to "info" which logger will use to run `console.info`. Other options are `error`, `log`, `table`, `warn`
	3. __verbose__ defaults to `true` that will allow logger to log changes, difference of **storageWatcher.lastStorage** and **window.localStorage**. To turn logger off, change this to `false`
* `configure` public method, this method configures settings.
* `start` public method, starts the watcher
* `stop` public method, stops the watcher
* `lastStorage` public property, holds last storage object before recent change

### Using methods
```javascript
  var watcher = storageWatcher;

  // Configure watcher
  watcher.configure({
  	verbose: true, // (Bool) Default: true
  	duration: 3000, // (Integer) Default: 1500
  	logType: 'warn' // (String) Default: 'info'
  })

  // Start watcher
  watcher.start();

  // add to storage to see the watcher's behavior
  localStorage.setItem('testKey', 'testValue');

  // on next watch cycle, the watcher will log the change and the difference of watcher.lastStorage and window.localStorage

  // Stop watcher
  watcher.stop()

  // Get the last saved storage
  watcher.lastStorage
```

## Example
In the __example__ folder, open __index.html__ in browser and you will see a logger system similar to your browser console and bunch of useful buttons. 
