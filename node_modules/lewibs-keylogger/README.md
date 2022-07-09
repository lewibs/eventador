# lewibs-keylogger
This is used to log the keys that the user presses in browser

# usage

To use lewibs-keylogger in a project:
```js
  npm install lewibs-keylogger
```

```js
  import Keylogger from 'lewibs-keylogger';

  //code
  let logger = new Keylogger();
```

There are 2 important fields to note:

Keylogger.pressed which is:
```js
  {
    keynames:bool
  }
```
  
Keylogger.history which is:
```js
  [{
    pressed:{keynames:bool},
    time: unixTimeInt,
    event: Event,
  }]
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
    pressed: {},
    history[],
    
    //public methods
    start: start(),
    stop: stop(),
    kill: kill(),
  }
```

# test
to test the keylogger run the test dir as a standard react program
