const WHEEL = "wheel";
const LEFTMOUSE = "leftmouse";
const MIDDLEMOUSE = "middlemouse";
const RIGHTMOUSE = "rightmouse";

class Keylogger {
    
    constructor() {
        this._running = false;
        this._events = [];

        this.isKeylogger  = true;
        this.pressed = {};
        this.history = [];

        this.start();
    }

    start() {
        if (!this._running) {
            const pressed = (e) => {
                this.pressed[e.key] = true;
            }
            
            const unpressed = (e) => {
                delete this.pressed[e.key];
            }

            const addEvent = (trigger, event) => {

                const tunnel = (event) => {
                    const addToHistory = (event) => {
            
                        this.history.push({
                            pressed: Object.assign({}, this.pressed),
                            event: event,
                            time: new Date().getTime(),
                        });
            
                        return event;
                    };
            
                    const format = (event) => {
                        if (event instanceof CustomEvent) {
                            let key = event.detail.type;
                            event = event.detail;
                            event.key = key;
                        } else {
                            switch (event.which) {
                                case 0:
                                    event.key = WHEEL;   
                                    break;
                                case 1:
                                    event.key = LEFTMOUSE;
                                    break;
                                case 2:
                                    event.key = MIDDLEMOUSE;
                                    break;
                                case 3:
                                    event.key = RIGHTMOUSE;
                                    break;
                            }   
                        }
                        
                        return event;
                    };
            
                    event = format(event);
                    event = addToHistory(event);
                    return event;
                }

                const dispatch = (e) => {
                    e = tunnel(e);
                    event(e);
                }
        
                this._events.push({
                    trigger: trigger,
                    dispatch: dispatch,
                });
        
                window.addEventListener(trigger, dispatch);
            }

            const splitEvent = (name) => {
                let startName = name + 'start';
                let endName = name + 'end';
                let timer;
                
                let formatCustom = (name, e) => {
                    return new CustomEvent(name, {detail: e});
                };
                
                let eventEnd = (e)=>{
                    window.dispatchEvent(formatCustom(endName, e));
                    timer = undefined;
                };
                
                let eventStart = (e)=>{
                    if (timer === undefined) {
                        window.dispatchEvent(formatCustom(startName, e));
                    }
                    
                    clearTimeout(timer);
                    timer = setTimeout(()=>{eventEnd(e)}, 100);
                };
        
                addEvent(name, eventStart);
            }

            //make custom _events - nameend and namestart
            splitEvent('wheel');
            splitEvent('mousemove');
            
            //key
            addEvent('keyup', (e)=>{unpressed(e)});
            addEvent('keydown', (e)=>{pressed(e)});
            
            //mouse
            addEvent('mousedown', (e)=>{pressed(e)});
            addEvent('mouseup', (e)=>{unpressed(e)});

            //wheel
            addEvent('wheelstart', (e)=>{pressed(e)});
            addEvent('wheelend', (e)=>{unpressed(e)});
            
            //mousemove
            addEvent('mousemovestart', (e)=>{pressed(e)});
            addEvent('mousemoveend', (e)=>{unpressed(e)});

            this._running = true;
        }
    }

    stop() {
        if (this._running) {
            this._events.forEach((v)=>{
                window.removeEventListener(v.trigger, v.dispatch);
            });
            this._events = [];

            this._running = false;
        }
    }

    kill() {
        this.stop();
        this.history = [];
        this.pressed = {};
    }
}

module.exports = Keylogger;