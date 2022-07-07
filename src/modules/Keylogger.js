import root from 'window-or-global'

class Keylogger {
    pressedKeys = {};
    events = {};
    history = [];
    
    constructor() {
        //make custom events - nameend and namestart
        this.splitEvent('wheel');
        this.splitEvent('mousemove');
        
        //key
        this.addEvent('keyup', (e)=>{this.unpressed(e)});
        this.addEvent('keydown', (e)=>{this.pressed(e)});
        
        //mouse
        this.addEvent('mousedown', (e)=>{this.pressed(e)});
        this.addEvent('mouseup', (e)=>{this.unpressed(e)});

        //wheel
        this.addEvent('wheelstart', (e)=>{this.pressed(e)});
        this.addEvent('wheelend', (e)=>{this.unpressed(e)});
        
        //mousemove
        this.addEvent('mousemovestart', (e)=>{this.pressed(e)});
        this.addEvent('mousemoveend', (e)=>{this.unpressed(e)});
    }
    
    toString() {
        return JSON.stringify(this.history);
    }
    
    kill() {
        Object.keys(this.events).forEach((id)=>{
            this.removeEvent(id);
        });
    }
    
    addEvent(trigger, event, requiredKeys = [], maxCalls = false) {
        let id = uuidv4();
        
        let dispatch = (e) => {
            e = this.formatEvent(e);
            
            let keysPressed = 0;
            requiredKeys.forEach((v)=>{
                if (this.pressedKeys[v]) {
                    keysPressed++;
                }
            });
            
            let eventHistory = this.events[id];
            eventHistory.callTime = new Date().getTime();
            
            //triggered. will run if required keys is empty too
            if (keysPressed === requiredKeys.length) {
                eventHistory.calls++;
                eventHistory.success = true;

                event(e);
                
                if (maxCalls !== false && maxCalls <= this.events[id].calls) {
                    eventHistory = this.removeEvent(id);
                }
            } else {
                eventHistory.success = false;
            }
            
            this.history.push({
                eventInfo: Object.assign({}, eventHistory),
                keysPressed: Object.assign({}, this.pressedKeys),
            });
        };
        
        this.events[id] = eventInfo({
            id: id,
            trigger: trigger,
            event: dispatch
        });
        
        window.addEventListener(trigger, dispatch);
    }
    
    pressed(e) {
        this.pressedKeys[e.key] = true;
    }
    
    unpressed(e) {
        delete this.pressedKeys[e.key];   
    }
    
    removeEvent(id) {
        let event = this.events[id];
        event.removed = true;
        delete this.events[id];
        window.removeEventListener(event.trigger, event.event);
        return event;
    }
    
    //used to take single call events and give them a start and stop
    splitEvent(name) {
        let startName = name + 'start';
        let endName = name + 'end';
        
        let timer;
        
        let formatCustom = (name, e) => {
            return new window.CustomEvent(name, {detail: e});
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
        
        window.addEventListener(name, eventStart);
        
        //this is so we can kill the unique events when the keylogger is ended
        let event = eventInfo({
            trigger: name,
            event: eventStart,
        });
        
        this.events[event.id] = event;
    }
}

const instance = new Keylogger();
Object.freeze(instance);

root.eventador = root.eventador || {};
root.eventador.keylogger = instance;

export default instance;