# lewibs-keylogger
This is used to log the keys that the user presses in browser

# usage

To use lewibs-keylogger in a project:
```js
  npm install lewibs-keylogger
```

```js
  import Keylogger from 'lewibs-keylogger';
  
  //activate global
  Keylogger.instance.start();
  
  //or

  //new keylogger instannce
  let logger = new Keylogger();
```

There are 3 important fields to note:

Keylogger.prototype.pressed which is:
```js
  {
    keynames:bool
  }
```
  
Keylogger.prototype.history which is:
```js
  [{
    pressed:{keynames:bool},
    time: unixTimeInt,
    event: Event,
  }]
```

Keylogger.instance
```js
  Keylogger.instance : new Keylogger();
```
  
Additionally there are three prototypes attached:
```js
  start() : which starts logging
  stop(): which pauses the logging
  kill(): which pauses the logging and also removes the history
```

Overall you get an object which looks like this:
```js
  {
    //privates
    _events: [],
    _running: true,
    
    //public fields
    isKeylogger: true,
    global: Keylogger,
    pressed: {},
    history[],
    
    //public methods
    start: start(),
    stop: stop(),
    kill: kill(),
  }
```

finally there are four unique keys:
```js
  const WHEEL = "wheel";
  const LEFTMOUSE = "leftmouse";
  const MIDDLEMOUSE = "middlemouse";
  const RIGHTMOUSE = "rightmouse";
```

# test
to test the keylogger run the test dir as a standard react program
