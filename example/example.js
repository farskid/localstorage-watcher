
var storageWatcher = (function() {

  /*
    Check for equality of two objects
  */
  function isEqual(a, b) {

    // Grab a clone of both
    var _a = clone(a), _b = clone(b)

    // Delete length property of window.localStorage
    delete _a.length
    delete _b.length

    // Check for equality by mapping
    for (var i in _b) {
      if (!(i in _a) || (_a[i] !== _b[i])) return false
    }

    return true

  }

  /*
    Diff of two objects a, b
  */

  function diff(a, b) {
    var _a = clone(a), _b = clone(b)

    var _diff = []

    delete _a.length
    delete _b.length

    if (isEqual(_a, _b)) return false

    for (var i in _b) {
      if (!(i in _a) || (_a[i] !== _b[i])) {
        _diff.push('' + i + ': ' + _a[i] + ' ==> ' + _b[i])
      }
    }

    return _diff
  }

  /*
    Clone Object
  */
  function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  /*
    Merge two objects a, b
  */
  function merge(a, b) {
    for (var key in b) { a[key] = b[key] }
      return a
  }

  /*
    Clone window.localStorage
  */
  function cloneStorage() {
    var _clone = clone(window.localStorage)
    delete _clone.length
    return _clone
  }

  /* variables */
  var interval, start, stop, isRunning = false, configure, settings, log, lastStorage = cloneStorage()

  // Default Settings
  settings = {
    duration: 1500,
    verbose: true,
    logType: 'info'
  }

  /* Logger */
  log = function(msg) {

    var _child = document.createElement('div')

    // Do nothing in case verbose is off
    if (!settings.verbose) return false
    
    // Support array of multiple messages
    if (Array.isArray(msg)) msg.map(function(m) {
      console[settings.logType](m);

      /* Write to console element */
      
      (function(n) {
        _child.innerText = n
        document.getElementById('console').appendChild(_child)
      })(m)

    })
    // Single message
    else {
      console[settings.logType](msg)

      /* Write to console element */
      _child.innerText = msg
      document.getElementById('console').appendChild(_child)
    }

  }
  
  /* Configure watcher and change settings */
  configure = function(setts) {
    settings = merge(settings, setts)
    log([`configured watcher to`, settings])
  }

  /* Start watcher */
  start = function() {

    if (isRunning) {
      log('Start request rejetced because the watcher is already running')
      return false
    }

    // Set state
    isRunning = true

    // Assign interval
    interval = setInterval(function() {
      if (!isEqual(lastStorage, window.localStorage)) {
        log(['storage changed', diff(lastStorage, window.localStorage)])
        lastStorage = cloneStorage()
      }
      else {
        log('No change')
      }
    }, settings.duration)

    log('watcher started')
  }

  /* Stop watcher */
  stop = function() {
    isRunning = false
    clearInterval(interval)
    log('watcher stopped')
  }

  /* Public methods and props */
  return {
    configure,
    start,
    stop,
    lastStorage
  }

})()