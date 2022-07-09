import Keylogger from 'lewibs-keylogger';
import {DEFAULTOPTONS} from '../modules/Eventador';

//make a seperate instance of keylogger since I dont want to use the global one in case that gets paused
const keylogger = new Keylogger();

//a module is only evaluated once meaning it is safe to assign these like so without needing to worry about the proto chain getting too big
const clasicAddEventListener = EventTarget.prototype.addEventListener;
const clasicRemoveEventListener = EventTarget.prototype.removeEventListener;

//makes all the options backwards compatable. meaning you wont break a project by adding eventador 
function formatOptions(options=DEFAULTOPTONS) {
    if (typeof options === 'boolean') {
        options = Object.assign(DEFAULTOPTONS, {useCapture:options});
    }else {
        //for the case that an opject of options are passed in.
        options = Object.assign(DEFAULTOPTONS, options);
    }

    return options;
}

EventTarget.prototype.removeEventListener = function(event, func, options) { 
    options = formatOptions(options);
    this.clasicRemoveEventListener(event, func, options.useCapture);
}

EventTarget.prototype.addEventListener = function(event, func=()=>{}, options) {
    options = formatOptions(options);

    let dispatch = (e) => {

        let keysPressed = 0;
        options.requiredKeys.forEach((k)=>{
            if (this.eventador.keylogger.pressedKeys[k]) {
                keysPressed++;
            }
        });

        let eventHistory = this.eventador.events[id];
        eventHistory.callTime = new Date().getTime();

        //triggered will run if required keys is empty too
        if (keysPressed === options.requiredKeys.length) {
            eventHistory.calls++;
            eventHistory.success = true;

            func(e);

            if (options.maxCalls !== false && options.maxCalls <= this.eventador.events[id].calls) {
                eventHistory = this.eventador.removeEvent(this, id);
            }
        } else {
            eventHistory.success = false;
        }
    };

    this.eventador.events[id] = eventInfo({
        id:id,
        trigger: event,
        event: dispatch,
    });

    this.clasicAddEventListener(event, dispatch);

    return dispatch;
}