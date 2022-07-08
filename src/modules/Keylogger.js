import root from 'window-or-global';

class Keylogger {
    pressedKeys = {};
    
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
    
    addEvent(trigger, event) {
        let dispatch = (e) => {
            event(Event.eventador.format(e));
        }

        root.addEventListener(trigger, dispatch);
    }
    
    pressed(e) {
        this.pressedKeys[e.key] = true;
        console.log(this.pressedKeys);
    }
    
    unpressed(e) {
        delete this.pressedKeys[e.key];
        console.log(this.pressedKeys);
    }

    splitEvent(name) {
        let startName = name + 'start';
        let endName = name + 'end';
        
        let timer;
        
        let formatCustom = (name, e) => {
            return new CustomEvent(name, {detail: e});
        };
        
        let eventEnd = (e)=>{
            root.dispatchEvent(formatCustom(endName, e));
            timer = undefined;
        };
        
        let eventStart = (e)=>{
            if (timer === undefined) {
                root.dispatchEvent(formatCustom(startName, e));
            }
            
            clearTimeout(timer);
            timer = setTimeout(()=>{eventEnd(e)}, 100);
        };
        
        root.addEventListener(name, eventStart);
    }
}

//make singleton
const instance = new Keylogger();
Object.freeze(instance);

//attach to root //causes the eventador prototype on EventTarget to be overwritenm for window events
//root.eventador = root.eventador || {};
//root.eventador.keylogger = root.eventador.keylogger || instance;

//export singleton
export default instance;