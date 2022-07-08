import { v4 as uuidv4 } from 'uuid';
import keylogger from '../modules/Keylogger.js';
import eventInfo from '../modules/eventInfo.js';

const defaultOptions = ()=>{
    return JSON.parse(JSON.stringify({ 
        capture:false,
        useCapture:false,
        requiredKeys:[],
        maxCalls:false,
    }))
};

EventTarget.prototype.eventador = EventTarget.prototype.eventador || {};

EventTarget.prototype.eventador.events = EventTarget.prototype.eventador.events || {};

EventTarget.prototype.eventador.keylogger = EventTarget.prototype.eventador.keylogger || keylogger;

EventTarget.prototype.eventador.removeEvent = EventTarget.prototype.eventador.removeEvent || function(target, id) {
    let event = target.eventador.events[id];
    event.removed = true;
    delete target.eventador.events[id];
    target.removeEventListener(event.trigger, event.event);
    return event;
}

EventTarget.prototype.clasicRemoveEventListener = EventTarget.prototype.clasicRemoveEventListener || EventTarget.prototype.removeEventListener;

EventTarget.prototype.clasicAddEventListener = EventTarget.prototype.clasicAddEventListener || EventTarget.prototype.addEventListener;

EventTarget.prototype.removeEventListener = EventTarget.prototype.removeEventListener || function(event, func, options=defaultOptions()) {
    //backwards compatable :)
    if (typeof options === 'boolean') {
        let useCapture = options;
        options = defaultOptions();
        options.useCapture = useCapture;
    }

    //func is returned when an event is made
    this.clasicRemoveEventListener(event, func, options.useCapture);
}

EventTarget.prototype.addEventListener = function(event, func=()=>{}, options=defaultOptions()) {
    //testing react
    //if (func.name !== '') {
    //    this.clasicAddEventListener(event, func, options);
    //}


    //backwards compatable :)
    if (typeof options === 'boolean') {
        let capture = options;
        options = defaultOptions();
        options.capture = capture;
    } else {
        //for the case that an opject of options are passed in.
        options = Object.assign(defaultOptions(), options);
    }

    let id = uuidv4();

    let dispatch = (e) => {
        e = Event.eventador.format();

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